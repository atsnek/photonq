import { Stack, Heading, IconButton, VStack, Box, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import TbStar from '../../../shared/components/icons/tabler/TbStar';
import RightNavPostReader from '../reader/components/RightNavPostReader';
import { TPost } from '../types/post';
import { formatPostDate } from '../../../shared/utils/features/post';
import { useAuthenticationContext } from '@atsnek/jaen';
import UncontrolledMdxEditor from '../../../shared/components/mdx-editor/UncontrolledMdxEditor';

interface IPostReaderProps {
  post?: TPost;
  isAuthor?: boolean;
  handleRatePost?: () => void;
  isRating?: boolean;
}

const PostReader: FC<IPostReaderProps> = ({ post, isAuthor, handleRatePost, isRating }) => {
  const isAuthenticated = useAuthenticationContext().user !== null;

  const postDate = useMemo(() => formatPostDate(post?.createdAt, 'l'), [post?.createdAt]);

  return (
    <Stack spacing={{ base: 0, xl: 12 }} direction="row" mb={10}>
      <Box maxW="900px" w="full">
        <Text fontSize="sm" color="gray.500">
          {postDate}
        </Text>
        <Heading variant="h1" mt={0} mb={10}>
          {post?.title}
          {isAuthenticated && !isAuthor && (
            <IconButton
              icon={
                <TbStar
                  fill={post?.hasRated ? 'features.rating.rated.color' : 'transparent'}
                  stroke={post?.hasRated ? 'features.rating.rated.color' : 'currentColor'}
                />
              }
              aria-label="Rate post"
              variant="ghost-hover-opacity"
              _hover={{
                opacity: 1,
                transform: 'scale(1.3)',
                color: 'features.rating._hover.color'
              }}
              onClick={handleRatePost}
              isDisabled={isRating}
            />
          )}
        </Heading>
        <VStack
          spacing={3}
          alignItems="start"
          __css={{
            pre: {
              w: 'full'
            },
            'p, h2, h1, h3, h4, h5, h6': {
              wordBreak: 'break-word'
            }
          }}
        >
          <UncontrolledMdxEditor value={post?.content} isEditing={false} onUpdateValue={() => {}} />
        </VStack>
      </Box>
      <RightNavPostReader postContent={post?.content} />
    </Stack>
  );
};

export default PostReader;
