import { Dispatch, FC, SetStateAction, useRef } from 'react';
import { TPost } from '../types/post';
import { Stack, Box, useToast } from '@chakra-ui/react';
import UncontrolledMdxEditor from '../../../shared/components/mdx-editor/UncontrolledMdxEditor';
import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';
import { TDebounceData } from '../../../shared/types/comm';
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
  const stateRef = useRef<TDebounceData>({
    state: 'inactive',
    timeout: undefined
  });
  const updatePostContent = useAppStore(state => state.singlePost.editContent);

  const handleEditorChange = (value: MdastRoot) => {
    clearTimeout(stateRef.current.timeout);
    stateRef.current.timeout = setTimeout(async () => {
      setIsSavingPost(true);
      await updatePostContent(value);
      setIsSavingPost(false);
      if (!madeChanges) setMadeChanges(true);
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
    </>
  );
};

export default PostEditor;
