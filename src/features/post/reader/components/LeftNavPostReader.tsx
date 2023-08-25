import { FC } from 'react';
import LeftNav from '../../../../shared/containers/navigation/LeftNav';
import { TPost } from '../../types/post';
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  VStack
} from '@chakra-ui/react';
import { TUser } from '../../../user/types/user';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';
import { formatNumber } from '../../../../shared/utils/utils';
import Link from '../../../../shared/components/Link';

interface ILeftNavPostReaderProps {
  post: TPost;
  user: TUser;
}

/**
 * Left navigation for reading a post.
 */
const LeftNavPostReader: FC<ILeftNavPostReaderProps> = ({ post, user }) => {
  return (
    <LeftNav w="full" isExpanded textAlign="center">
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
        <LinkBox
          as={Avatar}
          width={{
            base: '50%',
            md: 'full'
          }}
          maxW="120px"
          h="max-content"
          name={user.displayName}
          src="https://onedrive.live.com/embed?resid=AE2DDC816CEF3E1E%21220972&authkey=%21AIUh8CadUcYw3cg&width=999999&height=1024"
          aspectRatio={1}
          _hover={{
            boxShadow: 'rgba(0, 0, 0, 0.2) 6px 12px 28px -5px',
            transform: 'scale(1.02)'
          }}
          transition="box-shadow 0.2s cubic-bezier(.17,.67,.83,.67), transform 0.2s cubic-bezier(.17,.67,.83,.67)"
        >
          <LinkOverlay href="/profile" />
        </LinkBox>
        <Box textAlign="center">
          <Link href="/profile">
            <Heading
              as="h6"
              fontSize="lg"
              color="views.postReader.leftNav.author.displayName.color"
            >
              {user.displayName}
            </Heading>
          </Link>
          <Text
            fontSize="xs"
            color="views.postReader.leftNav.author.label.color"
          >
            Author
          </Text>
        </Box>
      </VStack>
      <Divider />
      <HStack spacing={1} my={3} justifyContent="center">
        <TbStar
          fontSize="xs"
          stroke="features.rating.rated.color"
          fill="features.rating.rated.color"
        />
        <Text fontSize="xs" color="gray.500" verticalAlign="middle">
          {formatNumber(post.likes)}
        </Text>
      </HStack>
      <Heading
        as="h6"
        fontSize="sm"
        color="gray.500"
        mb={1}
        fontWeight="medium"
      >
        Post Summary
      </Heading>
      <Text fontSize="sm" color="gray.500" mb="2">
        {post.summary}
      </Text>
    </LeftNav>
  );
};

export default LeftNavPostReader;
