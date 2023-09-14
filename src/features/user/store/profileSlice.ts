import { TProfile } from "../types/user";
import { TPostListData, TPostPreview, TPostPrivacy } from "../../post/types/post";
import { TActivitySection, TActivityType } from "../activity/types/activity";
import { sq } from "@snek-functions/origin";
import { produce } from "immer";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { TProfileSlice } from "../types/profileState";
import { getUserDisplayname } from "../utils/user";
import { useAppStore } from "../../../shared/store/store";
import { Post, PrivacyInputInput } from "@snek-functions/origin/dist/schema.generated";

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

            // Only show the most recent rating for a post
            const activityRatingPostIds: Array<{ createdAt: string, id: string }> = [];
            profile?.activity.filter(({ type }) => type.startsWith("star")).sort((a, b) => {
                if (!a.createdAt || !b.createdAt) return 0;
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }).forEach(({ createdAt, post, type }) => {
                if (!post) return;
                const pos = activityRatingPostIds.findIndex(({ id }) => id === post.id);
                const isUnstar = type === "star_unstar";
                if (pos !== -1) {
                    if (new Date(activityRatingPostIds[pos].createdAt) > new Date(createdAt)) return;
                    if (type === "star_unstar") {
                        activityRatingPostIds.splice(pos, 1);
                        return;
                    }
                    activityRatingPostIds[pos].createdAt = createdAt;
                }
                else if (!isUnstar) activityRatingPostIds.push({ createdAt, id: post.id });

            })

            profile?.activity.forEach(async ({ createdAt, follow, post, type }) => {
                //! Because of snek-query, we need to access all post props we need here, otherwise it won't be fetched
                post?.title;
                if (!createdAt || (type.startsWith("star_") && post && activityRatingPostIds.findIndex(({ createdAt: existingCreatedAt, id }) => id === post.id && existingCreatedAt === createdAt)) === -1) return;

                const date = new Date(createdAt);
                const sectionDate = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate()
                );

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
                    title = `Created a blog post \"${post.title?.substring(0, 20)}${post.title?.length > 20 ? '...' : ''
                        }\"`;
                    href = '/docs/' + post.slug;
                } else if (type === 'profile_create') {
                    title = `Created a profile`;
                    href = '#';
                } else if (type === 'follow_follow' && follow) {
                    const [followedUser, followedUserError] = await sq.query(q => q.user({ id: follow.followed.id }));
                    if (!followedUser || followedUserError) return;
                    title = `Followed ${getUserDisplayname(followedUser)}`;
                    href = (follow.followed?.id) ? '/user/' + follow.followed?.id : '#';
                } else if (type === 'star_star' && post) {
                    title = `Starred a post \"${post.title?.substring(0, 20)}${post.title?.length > 20 ? '...' : ''
                        }\"`;
                    href = '/docs/' + post.slug;
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
                            slug: post.slug,
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
                            // canManage: false,
                            //TODO: Re-enable this once the backend error is fixed
                            canManage: post.profile?.id === currentUser?.id,
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
                const [user] = await sq.query(q => q.user({ resourceId: __SNEK_RESOURCE_ID__, id: p?.profileId }));
                const post = p as Post;
                const date = new Date(post.createdAt);
                return {
                    id: post.id,
                    slug: post.slug,
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