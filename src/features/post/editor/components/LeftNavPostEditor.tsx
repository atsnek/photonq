import { FC } from 'react';
import LeftNav from '../../../../shared/containers/navigation/LeftNav';
import {
  VStack,
  Heading,
  Textarea,
  Box,
  Tag,
  Input,
  InputGroup,
  InputRightAddon,
  Divider,
  Spacer
} from '@chakra-ui/react';
import { TPost } from '../../types/post';
import TbEdit from '../../../../shared/components/icons/tabler/TbEdit';
import Image from '../../../../shared/components/image/Image';

interface ILeftNavPostEditorProps {
  post: Partial<TPost>;
}

/**
 * Left navigation for editing a post.
 */
const LeftNavPostEditor: FC<ILeftNavPostEditorProps> = ({ post }) => {
  const hasPublished = post.publicationDate !== undefined;

  return (
    <LeftNav w="full" isExpanded={true} display={{ base: 'none', md: 'flex' }}>
      <VStack
        spacing={2}
        __css={{
          '& img': {
            // We need this to force the image to be a square
            h: 'auto',
            aspectRatio: '1 / 1',
            objectPosition: 'top'
          }
        }}
      >
        <Box overflow="hidden" borderRadius="full">
          <Image
            src="https://picsum.photos/200"
            w={{ base: '50%', md: 'full' }}
            maxW="120px"
            h="max-content"
            _hover={{
              transform: 'scale(1.05)'
            }}
            transition="transform 0.2s cubic-bezier(.17,.67,.83,.67)"
            editable
          />
        </Box>
        <Box
          position="relative"
          __css={{
            '&:hover': {
              '& #editor-left-nav-edit-title-icon': {
                opacity: 1
              }
            }
          }}
        >
          <Input
            variant="ghost"
            size="sm"
            placeholder="My Post"
            defaultValue={post.title ?? 'My Post'}
            textAlign="center"
            px={8}
            fontWeight="semibold"
            borderRadius="md"
          />
          <TbEdit
            id="editor-left-nav-edit-title-icon"
            position="absolute"
            top={0}
            right={2}
            bottom={0}
            margin="auto 0"
            opacity={0}
            transition="opacity 0.2s ease-in-out"
          />
        </Box>
        <Tag size="sm" colorScheme={hasPublished ? 'green' : 'yellow'}>
          {hasPublished ? 'public' : 'private'}
        </Tag>
        <Divider mt={8} mb={3} />
        <Heading
          as="h6"
          fontSize="sm"
          color="gray.500"
          mb={1}
          fontWeight="medium"
        >
          Post Summary
        </Heading>
        <Textarea
          defaultValue={post.summary ?? 'Short summary of your post'}
          placeholder="Short summary of your post"
          size="sm"
          borderRadius="lg"
          textAlign="center"
          variant="ghost"
        />
      </VStack>
    </LeftNav>
  );
};

export default LeftNavPostEditor;
