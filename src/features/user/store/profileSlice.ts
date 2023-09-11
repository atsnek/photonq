import { StateCreator } from "zustand";
import { TProfile, TUser } from "../types/user";
import { TPostListData, TPostPreview, TPostPrivacy } from "../../post/types/post";
import { TActivitySection, TActivityType } from "../activity/types/activity";
import { sq } from "@snek-functions/origin";
import { produce } from "immer";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { IProfileStateDefinition, TProfileSlice } from "../types/profileState";
import { getUserDisplayname } from "../utils/user";
import { useAppStore } from "../../../shared/store/store";
import { Post, PrivacyInput, PrivacyInputInput } from "@snek-functions/origin/dist/schema.generated";

export const createProfileSlice: TStoreSlice<TProfileSlice> = (set) => ({
    activity: [],
    overviewPosts: { state: "loading", posts: [] },
    searchPosts: { state: "inactive", posts: [] },
    profile: undefined,
    fetchProfile: async (username) => {
        console.log("fetching profile for", username);
        set(produce(state => ({ overviewPosts: { state: "loading", posts: [] } })))
        const [currentUser] = await sq.query(q => q.userMe);

        const [profileData, error] = await sq.query((q): TProfile | undefined => {
            //@ts-ignore TODO: Add this global var in the definition file
            const user = q.user({ resourceId: __SNEK_RESOURCE_ID__, login: username })

            const profile = user.profile;

            const activitySections: TActivitySection[] = [];
            let currentActivitySection: TActivitySection | null = null;

            profile?.activity.forEach(({ createdAt, follow, post, type }) => {
                if (!createdAt) return;

                const date = new Date(createdAt);
                const sectionDate = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate()
                );

                console.log("old section date: ", currentActivitySection?.timestamp, "new section date: ", sectionDate.toISOString());

                const currentSectionDate = currentActivitySection ? new Date(currentActivitySection.timestamp) : undefined;

                if (
                    !currentActivitySection || !currentSectionDate ||
                    currentSectionDate.getFullYear() !== sectionDate.getFullYear() ||
                    currentSectionDate.getMonth() !== sectionDate.getMonth()
                ) {
                    currentActivitySection = {
                        timestamp: sectionDate.toISOString(),
                        activities: []
                    };
                    activitySections.push(currentActivitySection);
                }

                let title = '';
                let href = '';

                if (type === 'blog_create' && post) {
                    title = `Created a blog post \"${post.title.substring(0, 20)}${post.title.length > 20 ? '...' : ''
                        }\"`;
                    href = '/docs/' + post.id;
                } else if (type === 'profile_create') {
                    title = `Created a profile`;
                    href = '#';
                } else if (type === 'follow_follow' && follow) {
                    title = `Followed ${follow.followed ? follow.followed.id : 'a user'
                        }`;
                    href = (follow.followed?.id) ? '/profile/' + follow.followed?.id : '#';
                }

                currentActivitySection.activities.push({
                    type: type as TActivityType,
                    timestamp: createdAt,
                    title: {
                        name: title,
                        href
                    }
                });
            });


            return {
                user: {
                    id: user.id,
                    avatarUrl: user.details?.avatarURL ?? '',
                    bio: profile?.bio ?? null,
                    displayName: `${user.details?.firstName ?? ''} ${user.details?.lastName ?? ''}`,
                    socials: [],
                    username: username,
                },
                activity: activitySections,
                posts: profile?.posts
                    .filter(
                        ({ privacy }) =>
                            privacy === 'public' ||
                            (currentUser && user.id === currentUser.id)
                    )
                    .map(post => {
                        const date = new Date(post.createdAt);
                        return {
                            id: post.id,
                            title: post.title,
                            summary: post.summary,
                            stars: post.stars.length,
                            avatarUrl: post.avatarURL,
                            profile: {
                                displayName: getUserDisplayname(user),
                                id: user.id,
                                username: user.username,
                                avatarUrl: user.details?.avatarURL,
                            },
                            createdAt: `
                              ${date.getFullYear()}-
                              ${date.getMonth().toString().padStart(2, '0')}-
                              ${date.getDate().toString().padStart(2, '0')}
                            `,
                            canManage: false,
                            //TODO: Re-enable this once the backend error is fixed
                            // canManage: post.profile?.userId === currentUserId,
                            privacy: post.privacy as TPostPrivacy,
                            profileId: post.profileId
                        };
                    }) ?? []
            }
        })

        if (error || !profileData) return false;

        set(produce((state: TStoreState): void => {
            state.profile.activity = profileData.activity;
            state.profile.overviewPosts = {
                state: "success",
                posts: profileData.posts
            };
            state.profile.profile = profileData.user;
        }))
        return true;
    },
    fetchSearchPosts: async (query, limit, offset) => {

        if (!query.length) {
            set(produce((state: TStoreState): void => {
                state.profile.searchPosts = {
                    state: "inactive",
                    posts: []
                };
            }))
            return;
        }

        set(produce(state => ({ overviewPosts: { state: "loading", posts: [] } })))

        console.log("searching for posts with query: ", query, "limit: ", limit, "offset: ", offset)

        const [currentUser] = await sq.query(q => q.userMe);
        const currentProfile = useAppStore.getState().profile.profile;

        if (!currentProfile) return;

        const [publicPosts, publicPostsError] = await sq.query(q => q.allSocialPost({ filters: { query, limit, offset, userId: currentProfile.id, privacy: PrivacyInputInput.public } }));

        const [privatePosts, privatePostsError] = (currentProfile.id === currentUser?.id) ? await sq.query(q => q.allSocialPost({ filters: { query, limit, offset, userId: currentProfile.id, privacy: PrivacyInputInput.private } })) : [[], null];

        if ((publicPostsError && privatePostsError) || (!publicPosts && !privatePosts)) {
            set(produce((state: TStoreState): void => {
                state.profile.searchPosts = {
                    state: "error",
                    posts: []
                };
            }))
            return;
        }

        const combinedPosts = [...publicPosts, ...privatePosts];


        const searchPosts: TPostListData = {
            state: "success",
            posts: await Promise.all(combinedPosts.filter(post => post !== null).map(async (p): Promise<TPostPreview> => {
                //@ts-expect-error
                const [user] = await sq.query(q => q.user({ resourceId: __SNEK_RESOURCE_ID__, id: p?.profileId }));
                const post = p as Post;
                const date = new Date(post.createdAt);
                return {
                    id: post.id,
                    title: post.title,
                    summary: post.summary,
                    stars: post.stars.length,
                    avatarUrl: post.avatarURL,
                    privacy: post.privacy as TPostPrivacy,
                    profile: {
                        displayName: getUserDisplayname(user),
                        id: user.id,
                        username: user.username,
                        avatarUrl: user.details?.avatarURL,
                    },
                    createdAt: `
                              ${date.getFullYear()}-
                              ${date.getMonth().toString().padStart(2, '0')}-
                              ${date.getDate().toString().padStart(2, '0')}
                            `,
                    canManage: false,
                }
            }))
        }

        set(produce((state: TStoreState): void => {
            state.profile.searchPosts = searchPosts;
        }));
    },
})