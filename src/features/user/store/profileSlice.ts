import { Profile } from "@snek-functions/origin/dist/schema.generated";
import { StateCreator } from "zustand";
import { PostSlice } from "../../post/store/postSlice";
import { TProfile, TUser } from "../types/user";
import { TPostListData, TPostPrivacy } from "../../post/types/post";
import { TActivitySection, TActivityType } from "../activity/types/activity";
import { sq } from "@snek-functions/origin";
import { produce } from "immer";
import { getUserDisplayname } from "../utils/user";


export interface ProfileSlice {
    user?: TUser,
    overviewPosts: TPostListData,
    activity: TActivitySection[],
    fetchProfile: (username: string, currentUserId?: string) => void,
}

export const createProfileSlice: StateCreator<ProfileSlice & PostSlice, [["zustand/devtools", never]], [], ProfileSlice> = (set) => ({
    activity: [],
    overviewPosts: { state: "loading", posts: [] },
    user: undefined,
    fetchProfile: async (username, currentUserId) => {
        console.log("fetching profile for", username);
        set(produce(state => ({ overviewPosts: { state: "loading", posts: [] } })))
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

                if (
                    !currentActivitySection ||
                    currentActivitySection.timestamp !== sectionDate.toISOString()
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
                    title = `Followed ${follow.followed ? follow.followed.userId : 'a user'
                        }`;
                    href = (follow.followed?.userId) ? '/profile/' + follow.followed?.userId : '#';
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
                            (currentUserId && user.id === currentUserId)
                    )
                    .map(post => {
                        const date = new Date(post.createdAt);
                        return {
                            id: post.id,
                            title: post.title,
                            summary: post.summary,
                            stars: post.stars.length,
                            avatarUrl: post.avatarURL,
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

        if (error || !profileData) return;

        set(produce((state: ProfileSlice) => {
            state.activity = profileData.activity;
            state.overviewPosts = {
                state: "success",
                posts: profileData.posts
            };
            state.user = profileData.user;
        }))
    }
})