import { getUserDisplayname } from '../../user/utils/user';
import { produce } from 'immer';
import {
  ISinglePostStateDefinition,
  TSinglePostSlice
} from '../types/singlePostState';
import { TStoreSlice, TStoreState } from '../../../shared/types/store';
import { sq } from '@snek-functions/origin';
import { asEnumKey } from 'snek-query';
import { EnPostLanguage, TPost, TPostPrivacy } from '../types/post';
import { TUser } from '../../user/types/user';
import {
  Language,
  LanguageInputInput,
  PrivacyInputInput
} from '@snek-functions/origin/dist/schema.generated';
import { osg, snekResourceId } from '@atsnek/jaen';
import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';

const initState: ISinglePostStateDefinition = {
  isNewPost: false,
  postAuthor: null,
  post: undefined
};

export const createSinglePostSlice: TStoreSlice<TSinglePostSlice> = (
  set,
  get
) => ({
  ...initState,
  createEmptyPost: async () => {
    const [post, error] = await sq.query((q): TPost | undefined => {
      if (!q.userMe) return undefined;
      return {
        authorProfileId: q.userMe.id,
        avatarUrl: null,
        content: undefined,
        createdAt: '',
        id: '',
        slug: '',
        privacy: 'PRIVATE',
        stars: 0,
        hasRated: false,
        summary: 'A short cool summary',
        title: 'My new post',
        canManage: true,
        language: EnPostLanguage.EN
      };
    });

    const [author, authorError] = await sq.query((q): TUser => {
      const user = q.user({
        id: post?.authorProfileId ?? '',
        resourceId: snekResourceId
      });

      if (post) {
        post.language = user.profile?.language ?? EnPostLanguage.EN;
      }

      return {
        id: user.id,
        username: user.username,
        displayName: getUserDisplayname(user),
        bio: user.profile?.bio ?? null,
        avatarUrl: user.details?.avatarURL ?? undefined,
        location: undefined
      };
    });

    set(
      produce((state: TStoreState) => {
        state.singlePost.isNewPost = true;
        state.singlePost.post = post;
        state.singlePost.postAuthor = author;
      })
    );
  },
  editContent: async content => {
    const post = get().singlePost.post;
    if (!post || post.content === content) return false;

    if (get().singlePost.isNewPost) {
      set(
        produce((state: TStoreState) => {
          if (!state.singlePost.post) return;
          state.singlePost.post.content = content;
        })
      );
      return true;
    }

    const [, error] = await sq.mutate(m =>
      m.socialPostUpdate({
        postId: post.id,
        values: { content: JSON.stringify(content) }
      })
    );

    if (error?.length > 0) return false;

    set(
      produce((state: TStoreState) => {
        if (!state.singlePost.post) return;
        state.singlePost.post.content = content;
      })
    );
    return true;
  },
  editSummary: async summary => {
    const post = get().singlePost.post;
    if (!post || post.summary === summary) return false;

    if (get().singlePost.isNewPost) {
      set(
        produce((state: TStoreState) => {
          if (!state.singlePost.post) return;
          state.singlePost.post.summary = summary;
        })
      );
      return true;
    }

    sq.mutate(m =>
      m.socialPostUpdate({ postId: post.id, values: { summary } })
    );
    set(
      produce((state: TStoreState) => {
        if (!state.singlePost.post) return;
        state.singlePost.post.summary = summary;
      })
    );
    return true;
  },
  editTitle: async title => {
    const post = get().singlePost.post;
    if (!post || post.title === title) return false;

    if (get().singlePost.isNewPost) {
      set(
        produce((state: TStoreState) => {
          if (!state.singlePost.post) return;
          state.singlePost.post.title = title;
        })
      );
      return true;
    }

    sq.mutate(m => m.socialPostUpdate({ postId: post.id, values: { title } }));
    set(
      produce((state: TStoreState) => {
        if (!state.singlePost.post) return;
        state.singlePost.post.title = title;
      })
    );
    return true;
  },
  fetchPost: async slug => {
    const [currentUser] = await sq.query(q => q.userMe);
    const [post, postError] = await sq.query((q): TPost | null => {
      const post = q.socialPost({ resourceId: snekResourceId, slug: slug });

      if (!post) return null;

      let jsonContent: TPost['content'] = undefined;
      try {
        if (post.content) {
          jsonContent = JSON.parse(post.content) as MdastRoot;
        }
      } catch {}

      return {
        authorProfileId: post.profileId,
        avatarUrl: post.avatarURL,
        content: jsonContent as MdastRoot,
        createdAt: post.createdAt,
        id: post.id,
        slug: post.slug,
        privacy: post.privacy as TPostPrivacy,
        stars: post.stars()?.totalCount ?? 0,
        hasRated:
          !!currentUser &&
          (post
            .stars()
            ?.nodes.some(star => star.profile.id === currentUser?.id) ??
            false),
        summary: post.summary,
        title: post.title,
        canManage: currentUser?.id === post.profileId,
        language: post.language ?? Language.EN
      };
    });

    if (postError || post === null) return false;

    const [author, authorError] = await sq.query((q): TUser => {
      const user = q.user({
        id: post?.authorProfileId ?? '',
        resourceId: snekResourceId
      });
      return {
        id: user.id,
        username: user.username,
        displayName: getUserDisplayname(user),
        bio: user.profile?.bio ?? null,
        avatarUrl: user.details?.avatarURL ?? undefined,
        location: undefined
      };
    });

    set(
      produce((state: TStoreState): void => {
        if (post === null) return;
        state.singlePost.post = post;
        state.singlePost.postAuthor = author;
        state.singlePost.isNewPost = false;
      })
    );

    return true;
  },
  createNewPost: async file => {
    const post = get().singlePost.post;

    if (!post) return undefined;

    let previewImage: string = '';
    if (file) {
      // Until now, the selected image was only handeled locally, so we need to upload it to the server first.
      const { fileUrl } = await osg.uploadFile(file);
      previewImage = fileUrl;
    }

    let content: string = '';
    try {
      content = JSON.stringify(post.content);
    } catch {}

    const [newPost, error] = await sq.mutate(q =>
      q.socialPostCreate({
        values: {
          title: post.title,
          avatarURL: previewImage,
          content,
          privacy: asEnumKey(PrivacyInputInput, post.privacy),
          language: asEnumKey(LanguageInputInput, post.language),
          summary: post.summary ?? ''
        }
      })
    );
    if (error?.length > 0 || post === null) return undefined;

    return newPost?.slug;
  },
  togglePostRating: async () => {
    const hasRated = get().singlePost.post?.hasRated ?? false;
    set(
      produce((state: TStoreState) => {
        if (!state.singlePost.post) return;
        state.singlePost.post.hasRated = !state.singlePost.post.hasRated;
      })
    );

    const postId = get().singlePost.post?.id ?? '';
    const [, error] = await sq.mutate(m => {
      if (hasRated) m.socialPostUnstar({ postId });
      else m.socialPostStar({ postId });
    });

    const updateSucceed = await get().singlePost.fetchPost(
      get().singlePost.post?.slug ?? ''
    );
    return error?.length === 0 && updateSucceed;
  },
  updatePreviewImage: async src => {
    if (!get().singlePost.post) return false;

    if (get().singlePost.isNewPost) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(src);

      fileReader.onload = () => {
        set(
          produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.avatarUrl = fileReader.result as string;
          })
        );
      };
      return true;
    }

    const { fileUrl } = await osg.uploadFile(src);

    set(
      produce((state: TStoreState) => {
        if (!state.singlePost.post) return;
        state.singlePost.post.avatarUrl = fileUrl;
      })
    );

    await sq.mutate(q =>
      q.socialPostUpdate({
        postId: get().singlePost.post?.id ?? '',
        values: { avatarURL: fileUrl }
      })
    );

    get().singlePost.fetchPost(get().singlePost.post?.slug ?? '');
    return true;
  },
  togglePrivacy: async () => {
    const isPublished = get().singlePost.post?.privacy === 'PUBLIC';
    const newPrivacy = isPublished ? 'PRIVATE' : 'PUBLIC';
    set(
      produce((state: TStoreState) => {
        if (!state.singlePost.post) return;
        state.singlePost.post.privacy = newPrivacy;
      })
    );

    if (get().singlePost.isNewPost) return true;

    const postId = get().singlePost.post?.id ?? '';
    const [, error] = await sq.mutate(m =>
      m.socialPostUpdate({
        postId,
        values: { privacy: asEnumKey(PrivacyInputInput, newPrivacy) }
      })
    );

    const updateSucceed = await get().singlePost.fetchPost(
      get().singlePost.post?.slug ?? ''
    );
    return error?.length === 0 && updateSucceed;
  },
  changeLanguage: async language => {
    set(
      produce((state: TStoreState) => {
        if (!state.singlePost.post) return;
        state.singlePost.post.language = language;
      })
    );

    const postId = get().singlePost.post?.id;

    if (!postId) return false;

    const [, error] = await sq.mutate(m =>
      m.socialPostUpdate({
        postId,
        values: { language: asEnumKey(LanguageInputInput, language) }
      })
    );

    return !error || error?.length === 0;
  },
  reset: () => {
    set(
      produce((state: TStoreState) => {
        state.singlePost.isNewPost = initState.isNewPost;
        state.singlePost.postAuthor = initState.postAuthor;
        state.singlePost.post = initState.post;
      })
    );
  },
  deletePost: async () => {
    const postId = get().singlePost.post?.id;

    if (!postId) return false;

    const [, error] = await sq.mutate(m => m.socialPostDelete({ postId }));

    return !error || error?.length === 0;
  }
});
