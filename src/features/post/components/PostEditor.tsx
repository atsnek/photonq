import { Dispatch, FC, RefObject, SetStateAction } from "react";
import { TPost } from "../types/post";
import {
  Stack,
  Box,
  useBreakpointValue,
  Heading,
  Input,
  VStack,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import UncontrolledMdxEditor from "../../../shared/components/mdx-editor/UncontrolledMdxEditor";
import { MdastRoot } from "@atsnek/jaen-fields-mdx/dist/MdxField/components/types";
import { useAppStore } from "../../../shared/store/store";
import { de } from "date-fns/locale";

interface IPostEditorProps {
  titleRef: RefObject<HTMLInputElement>;
  post?: TPost;
  handleTitleChange: (title: string) => void;
  setIsSavingPost: Dispatch<SetStateAction<boolean>>;
  madeChanges: boolean;
  setMadeChanges: Dispatch<SetStateAction<boolean>>;
}

const PostEditor: FC<IPostEditorProps> = ({
  titleRef,
  post,
  handleTitleChange,
  setIsSavingPost,
  madeChanges,
  setMadeChanges,
}) => {
  console.log(post);
  const editorMargin = useBreakpointValue({
    base: { mx: 5 },
    xl: { mx: 0, mr: 5 },
  });
  const updatePostContent = useAppStore(
    (state) => state.singlePost.editContent
  );
  const showTitle = useBreakpointValue({ base: false, md: true });

  const handleEditorChange = async (value: MdastRoot) => {
    setIsSavingPost(true);
    await updatePostContent(value);
    setIsSavingPost(false);

    if (!madeChanges) setMadeChanges(true);
  };

  if (!post) {
    // Render skeletons with the same layout as the editor

    return (
      <VStack w="full" gap={10}>
        <Skeleton height="40px" w="full" />
        <SkeletonText mt="4" noOfLines={8} spacing="4" w="full" />
      </VStack>
    );
  }

  return (
    <VStack w="full" gap={10}>
      <Box
        position="relative"
        w="full"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          my: "auto",
          w: "2px",
          h: 0,
          bg: "gray.300",
          borderRadius: "2px",
          transition: "height 0.2s ease-in-out",
        }}
        _hover={{
          _before: {
            h: "50%",
          },
        }}
        _focusWithin={{
          _before: {
            h: "80%",
          },
        }}
      >
        {showTitle && (
          <Input
            ref={titleRef}
            variant="unstyled"
            type="text"
            fontWeight="bold"
            placeholder="My Experiment"
            fontSize="4xl"
            ml={2}
            onChange={(e) => handleTitleChange(e.target.value)}
            defaultValue={post?.title}
          />
        )}
      </Box>
      <Stack
        direction="row"
        position="relative"
        flex={1}
        overflow="hidden"
        w="full"
      >
        <Box w="full" {...editorMargin}>
          <UncontrolledMdxEditor
            onUpdateValue={handleEditorChange}
            isEditing
            value={post.content}
          />
        </Box>
      </Stack>
    </VStack>
  );
};

export default PostEditor;
