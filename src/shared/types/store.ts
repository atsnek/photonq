import { StateCreator } from 'zustand';
import { TSinglePostSlice } from '../../features/post/types/singlePostState';
import { TUserSlice } from '../../features/user/types/userState';
import { TProfileSlice } from '../../features/user/types/profileState';
import { TCommunityPostsSlice } from '../../features/post/types/communityPostsState';

export interface TStoreState {
  singlePost: TSinglePostSlice;
  profile: TProfileSlice;
  currentUser: TUserSlice;
  communityPosts: TCommunityPostsSlice;
}

export type TStoreSlice<T> = StateCreator<
  TStoreState,
  [['zustand/devtools', never]],
  [],
  T
>;
