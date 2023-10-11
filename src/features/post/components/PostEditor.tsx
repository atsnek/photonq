import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { TPost } from '../types/post';
import { Stack, Box, useDisclosure, useToast } from '@chakra-ui/react';
import MdxEditor from '../../../shared/components/mdx-editor/MdxEditor';
import { wait } from '../../../shared/utils/utils';
import Alert from '../../../shared/components/alert/Alert';
import UncontrolledMdxEditor from '../../../shared/components/mdx-editor/UncontrolledMdxEditor';
import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';
import { TDebounceData } from '../../../shared/types/comm';
import { useAppStore } from '../../../shared/store/store';

const alertText = {
  publish: {
    label: 'Publish',
    header: 'Publish this post?',
    body: 'Are you sure you want to publish this post? This post will be visible to everyone.',
    confirmationLabel: 'Publish'
  },
  unpublish: {
    label: 'Unpublish',
    header: 'Unpublish this post?',
    body: 'Are you sure you want to unpublish this post? This post will no longer be visible to everyone.',
    confirmationLabel: 'Unpublish'
  }
};

interface IPostEditorProps {
  post?: TPost;
  setIsSavingPost: Dispatch<SetStateAction<boolean>>;
}

const PostEditor: FC<IPostEditorProps> = ({ post, setIsSavingPost }) => {
  const isPublic = post?.privacy === 'PUBLIC';

  const visibilityAlertDisclosure = useDisclosure({
    onClose: () => console.log('closed')
  });

  const stateRef = useRef<TDebounceData>({
    state: 'inactive',
    timeout: undefined
  });
  const updatePostContent = useAppStore(state => state.singlePost.editContent);

  const [alertContent, setAlertContent] = useState(
    isPublic ? alertText.publish : alertText.publish
  );
  const showToast = useToast();

  const publishPost = async () => {
    //TODO: Connect to Jaen
    showToast({
      title: alertContent.header,
      description: alertContent.body,
      status: 'success'
    });
    setAlertContent(alertText.unpublish);
    return;
  };

  const unpublishPost = async () => {
    //TODO: Connect to Jaen
    await wait(1000); // Simulate publishing
    visibilityAlertDisclosure.onClose();
    setAlertContent(alertText.publish);
    // setPost({ ...post, createdAt: undefined }); //TODO: Remove after connecting to Jaen
    return;
  };

  const togglePostVisibility = () => {
    if (isPublic) unpublishPost();
    else publishPost();
  };

  const handleEditorChange = (value: MdastRoot) => {
    clearTimeout(stateRef.current.timeout);
    stateRef.current.timeout = setTimeout(async () => {
      setIsSavingPost(true);
      await updatePostContent(value);
      setIsSavingPost(false);
    }, 1500);
  };

  return (
    <>
      <Stack direction="row" position="relative" flex={1} overflow="hidden">
        <Box w="full">
          <UncontrolledMdxEditor
            onUpdateValue={handleEditorChange}
            isEditing
            value={post?.content}
          />
        </Box>
      </Stack>
      <Alert
        disclosure={visibilityAlertDisclosure}
        confirmationAction={togglePostVisibility}
        confirmationLabel={alertContent.confirmationLabel}
        body={alertContent.body}
        header={alertContent.header}
      />
    </>
  );
};

export default PostEditor;
