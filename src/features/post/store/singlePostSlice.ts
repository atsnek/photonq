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
  PostDataInputInput,
  PrivacyInputInput
} from '@snek-functions/origin/dist/schema.generated';
import { osg, snekResourceId } from '@atsnek/jaen';
import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';

const initState: ISinglePostStateDefinition = {
  isNewPost: false,
  postAuthor: null,
  post: undefined,
  madeChanges: {
    title: false,
    avatarUrl: false,
    summary: false,
    content: false,
    language: false,
    privacy: false,
  },
  newAvatarUrlFile: undefined, // We need to store the file itself too, because we need to upload it to the storage server once the user saves the post.
};

const DEFAULT_POST_CONTENT: MdastRoot  = {
  "type": "root",
  "children": [
      {
          "type": "code",
          "lang": "qasm",
          "meta": "playground",
          "value": "// Define a quantum circuit with 2 qubits\nOPENQASM 2.0;            // Set the QASM version[^1]\ninclude \"qelib1.inc\";    // Include standard library[^2]\n\nqreg qubits[2];          // Declare a 2-qubit register[^3]\ncx qubits[0], qubits[1]; // Apply CNOT gate between qubits[^4]\n",
          "position": {
              "start": {
                  "line": 1,
                  "column": 1,
                  "offset": 0
              },
              "end": {
                  "line": 40,
                  "column": 4,
                  "offset": 735
              }
          }
      }
  ],
  "position": {
      "start": {
          "line": 1,
          "column": 1,
          "offset": 0
      },
      "end": {
          "line": 41,
          "column": 1,
          "offset": 736
      }
  }
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
        content: DEFAULT_POST_CONTENT,
        createdAt: '',
        id: '',
        slug: '',
        privacy: 'PRIVATE',
        stars: 0,
        hasRated: false,
        summary: '',
        title: '',
        canManage: true,
        language: EnPostLanguage.EN
      };
    });

    const [author, authorError] = await sq.query((q): TUser => {
      const user = q.user({ resourceId: __SNEK_RESOURCE_ID__, id: post?.authorProfileId ?? '' });

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

    set(
      produce((state: TStoreState) => {
        if (!state.singlePost.post) return;
        state.singlePost.post.content = content;
        state.singlePost.madeChanges.content = true;
      })
    );
    return true;
  },
  editSummary: async summary => {
    const post = get().singlePost.post;
    if (!post || post.summary === summary) return false;

    set(
      produce((state: TStoreState) => {
        if (!state.singlePost.post) return;
        state.singlePost.post.summary = summary;
        state.singlePost.madeChanges.summary = true;
      })
    );
    return true;
  },
  editTitle: async title => {
    const post = get().singlePost.post;
    if (!post || post.title === title) return false;

    set(
      produce((state: TStoreState) => {
        if (!state.singlePost.post) return;
        state.singlePost.post.title = title;
        state.singlePost.madeChanges.title = true;
      })
    );
    return true;
  },
  fetchPost: async slug => {
    const [currentUser] = await sq.query(q => q.userMe);
    const [post, postError] = await sq.query((q): TPost | null => {
      const post = q.socialPost({ resourceId: __SNEK_RESOURCE_ID__, slug: slug });

      if (!post) return null;

      let jsonContent: TPost['content'] = undefined;
      try {
        if (post.content) {
          jsonContent = JSON.parse(post.content) as MdastRoot;
        }
      } catch { }

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
      const user = q.user({ resourceId: __SNEK_RESOURCE_ID__, id: post?.authorProfileId ?? '' });
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

    if (!post || post.title.trim().length === 0) return undefined;

    let previewImage: string = '';
    if (file) {
      // Until now, the selected image was only handeled locally, so we need to upload it to the server first.
      const { fileUrl } = await osg.uploadFile(file);
      previewImage = fileUrl;
    }

    let content: string = '';
    try {
      content = JSON.stringify(post.content);
    } catch { }

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

    // if (get().singlePost.isNewPost) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(src);

    fileReader.onload = () => {
      set(
        produce((state: TStoreState) => {
          if (!state.singlePost.post) return;
          state.singlePost.post.avatarUrl = fileReader.result as string;
          state.singlePost.newAvatarUrlFile = src;
          state.singlePost.madeChanges.avatarUrl = true;
        })
      );
    };
    return true;
  },
  togglePrivacy: async () => {
    const isPublished = get().singlePost.post?.privacy === 'PUBLIC';
    const newPrivacy = isPublished ? 'PRIVATE' : 'PUBLIC';
    set(
      produce((state: TStoreState) => {
        if (!state.singlePost.post) return;
        state.singlePost.post.privacy = newPrivacy;
        state.singlePost.madeChanges.privacy = true;
      })
    );
    return true;
  },
  changeLanguage: async language => {
    console.log("language: ", language);
    set(
      produce((state: TStoreState) => {
        if (!state.singlePost.post) return;
        state.singlePost.post.language = language;
        state.singlePost.madeChanges.language = true;
      })
    );
    return true;
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
  },
  savePost: async () => {
    const post = get().singlePost.post;
    const madeChanges = get().singlePost.madeChanges;
    if (!post) return false;
    const values: PostDataInputInput = { title: post.title };

    if (madeChanges.content) {
      values.content = JSON.stringify(post.content);
    }
    if (madeChanges.summary && post.summary) {
      values.summary = post.summary;
    }

    if (madeChanges.title) {
      values.title = post.title;
    }
    const newAvatarUrlFile = get().singlePost.newAvatarUrlFile;
    if (madeChanges.avatarUrl && newAvatarUrlFile) {
      const { fileUrl } = await osg.uploadFile(newAvatarUrlFile);
      values.avatarURL = fileUrl;
    }
    if (madeChanges.privacy) {
      values.privacy = asEnumKey(PrivacyInputInput, post.privacy);
    }
    if (madeChanges.language) {
      values.language = asEnumKey(LanguageInputInput, post.language);
    }

    const [, error] = await sq.mutate(m => {
      m.socialPostUpdate({
        postId: post.id,
        values
      })
    });

    set(
      produce((state: TStoreState) => {
        state.singlePost.madeChanges = initState.madeChanges;
      })
    )

    return !error || error?.length === 0;
  },
});
