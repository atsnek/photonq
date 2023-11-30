import { Dispatch, FC, SetStateAction } from 'react';
import { TPost } from '../types/post';
import { Stack, Box, useBreakpointValue } from '@chakra-ui/react';
import UncontrolledMdxEditor from '../../../shared/components/mdx-editor/UncontrolledMdxEditor';
import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';
import { useAppStore } from '../../../shared/store/store';

interface IPostEditorProps {
  post?: TPost;
  setIsSavingPost: Dispatch<SetStateAction<boolean>>;
  madeChanges: boolean;
  setMadeChanges: Dispatch<SetStateAction<boolean>>;
}

const PostEditor: FC<IPostEditorProps> = ({
  post,
  setIsSavingPost,
  madeChanges,
  setMadeChanges
}) => {
  const editorMargin = useBreakpointValue({ base: { mx: 5 }, xl: { mx: 0, mr: 5 } });
  const updatePostContent = useAppStore(state => state.singlePost.editContent);

  const handleEditorChange = async (value: MdastRoot) => {
    setIsSavingPost(true);
    await updatePostContent(value);
    setIsSavingPost(false);

    if (!madeChanges) setMadeChanges(true);
  };

  return (
    <>
      <Stack direction="row" position="relative" flex={1} overflow="hidden">
        <Box w="full" {...editorMargin}>
          <UncontrolledMdxEditor
            onUpdateValue={handleEditorChange}
            isEditing
            value={post?.content}
          />
        </Box>
      </Stack>
    </>
  );
};

export default PostEditor;
