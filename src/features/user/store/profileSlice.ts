import { TProfile } from "../types/user";
import { TPostPreview } from "../../post/types/post";
import { sq } from "@snek-functions/origin";
import { asEnumKey } from "snek-query";
import { produce } from "immer";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { TProfileSlice } from "../types/profileState";
import { buildUserActivities } from "../utils/user";
import { useAppStore } from "../../../shared/store/store";
import { Post, PrivacyInputInput } from "@snek-functions/origin/dist/schema.generated";
import { buildPostPreview } from "../../../shared/utils/features/post";

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
            state.profile.searchPosts = { state: "loading", posts: [] };
        }))

        const currentProfile = useAppStore.getState().profile.profile;
        if (!currentProfile) return;

        const [currentUser,] = await sq.query(q => q.userMe);

        const fetchSocialPosts = async (privacy: PrivacyInputInput) => {
            const [rawPosts, rawError] = await sq.query(q => q.allSocialPost({ filters: { query, limit, offset, userId: currentProfile.id, privacy: asEnumKey(PrivacyInputInput, privacy) } }));
            const [posts, buildError] = await sq.query((q): TPostPreview[] | undefined => rawPosts?.filter(p => p !== null).map((p) => buildPostPreview(q, p as Post, currentUser)));
            return (rawError || buildError) ? undefined : posts;
        }

        const combinedPosts = [await fetchSocialPosts(PrivacyInputInput.private), await fetchSocialPosts(PrivacyInputInput.public)];

        if (combinedPosts.every(p => p === undefined)) {
            set(produce((state: TStoreState): void => {
                state.profile.searchPosts = {
                    state: "error",
                    posts: []
                };
            }))
            return;
        }

        set(
            produce((state: TStoreState): void => {
                state.profile.searchPosts = {
                    state: "success",
                    posts: combinedPosts.flat().filter(
                        (post): post is TPostPreview => post !== undefined
                    ),
                };
            })
        );
    },
})