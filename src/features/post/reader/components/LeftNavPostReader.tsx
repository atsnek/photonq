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
  VStack,
  HeadingProps
} from '@chakra-ui/react';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';
import { formatNumber } from '../../../../shared/utils/utils';
import Link from '../../../../shared/components/Link';
import { leftNavProfileStyling } from '../../../user/profile/components/LeftNavProfile';
import LeftNavPostReaderSkeleton from './LeftNavPostReaderSkeleton';
import { useAppStore } from '../../../../shared/store/store';

interface ILeftNavPostReaderProps {
  post?: TPost;
}

export const leftNavPostReaderStyling = {
  avatar: {
    boxSize: '3xs',
    aspectRatio: 1
  },
  divider: {
    mt: 3
  },
  rating: {
    hstack: {
      spacing: 1,
      my: 3,
      justifyContent: 'center'
    },
    icon: {
      fontSize: 'xs',
      stroke: 'features.rating.rated.color',
      fill: 'features.rating.rated.color'
    },
    text: {
      verticalAlign: 'middle'
    }
  },
  summary: {
    heading: {
      as: 'h6' as HeadingProps['as'],
      fontSize: 'sm',
      color: 'gray.500',
      my: 1,
      fontWeight: 'medium'
    }
  }
};

/**
 * Left navigation for reading a post.
 */
//TODO: Add LeftNavPostReader skeleton component
const LeftNavPostReader: FC<ILeftNavPostReaderProps> = ({ post }) => {
  const author = useAppStore(state => state.singlePost.postAuthor);

  if (!post || !author) return <LeftNavPostReaderSkeleton />;

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
          maxW="120px"
          {...leftNavProfileStyling.avatar}
          aspectRatio={1}
          name={author.displayName}
          src={author.avatarUrl}
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
              {author.displayName}
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
      <Divider {...leftNavPostReaderStyling.divider} />
      <HStack {...leftNavPostReaderStyling.rating.hstack}>
        <TbStar {...leftNavPostReaderStyling.rating.icon} />
        <Text fontSize="xs" color="gray.500" verticalAlign="middle">
          {formatNumber(post.stars)}
        </Text>
      </HStack>
      {post.summary && post.summary.length > 0 && (
        <>
          <Heading {...leftNavPostReaderStyling.summary.heading}>
            Post Summary
          </Heading>
          <Text fontSize="sm" color="gray.500" mb="2">
            {post.summary}
          </Text>
        </>
      )}
    </LeftNav>
  );
};

export default LeftNavPostReader;
