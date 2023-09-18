import { TProfile } from "../types/user";
import { sq } from "@snek-functions/origin";
import { produce } from "immer";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { TProfileSlice } from "../types/profileState";
import { buildUserActivities } from "../utils/user";
import { useAppStore } from "../../../shared/store/store";
import { buildPostPreview, searchPosts } from "../../../shared/utils/features/post";
import { TPostListData } from "../../post/types/post";

export const createProfileSlice: TStoreSlice<TProfileSlice> = (set, get) => ({
    activity: [],
    overviewPosts: { state: "loading", posts: [] },
    searchPosts: { state: "inactive", posts: [] },
    profile: undefined,
    fetchProfile: async (username) => {
        const [userData, error] = await sq.query((q): TProfile['user'] | undefined => {
            const user = q.user({ resourceId: __SNEK_RESOURCE_ID__, login: username })
            const profile = user.profile;
            return {
                id: user.id,
                avatarUrl: user.details?.avatarURL ?? '',
                bio: profile?.bio ?? null,
                displayName: `${user.details?.firstName ?? ''} ${user.details?.lastName ?? ''}`,
                socials: [],
                username: username,
            }
        })

        if (error || !userData) return false;

        set(produce((state: TStoreState): void => {
            state.profile.profile = userData;
        }))
        return true;
    },
    fetchOverviewPosts: async () => {
        if (!get().profile.profile) return false;

        const [currentUser,] = await sq.query(q => q.userMe);

        const [, error] = await sq.query(q => {
            const user = q.user({ resourceId: __SNEK_RESOURCE_ID__, login: get().profile.profile?.username })
            const profile = user.profile;

            set(produce((state: TStoreState): void => {
                state.profile.overviewPosts = {
                    state: "success",
                    posts: profile?.posts
                        .filter(
                            ({ privacy }) =>
                                privacy === 'public' ||
                                (currentUser && user.id === currentUser.id)
                        )
                        .map(p => buildPostPreview(q, p, currentUser)) ?? []
                };
            }))
        })
        return !!error;
    },
    fetchActivity: async () => {
        if (!get().profile.profile) return false;

        const [currentUser,] = await sq.query(q => q.userMe);

        const [, error] = await sq.query(q => {
            const user = q.user({ resourceId: __SNEK_RESOURCE_ID__, login: get().profile.profile?.username })
            const profile = user.profile;

            set(produce((state: TStoreState): void => {
                state.profile.activity = buildUserActivities(q, profile?.activity ?? [], currentUser);
            }))
        })

        return !!error;
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

        set(produce((state: TStoreState) => {
            state.profile.searchPosts = { state: "loading", posts: offset === 0 ? [] : state.profile.searchPosts.posts };
        }))

        const [currentUser,] = await sq.query(q => q.userMe);
        const currentProfile = useAppStore.getState().profile.profile;
        if (!currentProfile) return;

        const publicOffset = get().profile.searchPosts.posts.filter(p => p.privacy === "public").length;
        const publicPosts = await searchPosts(query, limit, publicOffset, "public", currentUser, currentProfile?.id);
        console.log("publicPosts:", publicPosts)


        const privateOffset = get().profile.searchPosts.posts.filter(p => p.privacy === "private").length;
        let privatePosts: TPostListData = { state: "inactive", posts: [] }
        if (currentUser && currentUser?.id === currentProfile.id) {
            privatePosts = await searchPosts(query, limit, privateOffset, "private", currentUser, currentProfile?.id);
            console.log("privatePosts:", privatePosts);
        }

        const combinedPosts = [...publicPosts.posts, ...privatePosts.posts];

        set(
            produce((state: TStoreState): void => {
                state.profile.searchPosts = {
                    state: "success",
                    posts: offset === 0
                        ? combinedPosts
                        : [...state.profile.searchPosts.posts, ...combinedPosts],
                    hasMore: publicPosts.hasMore || privatePosts.hasMore
                }
            })
        );
    },
})