import { ChangeEvent, FC, useRef } from 'react';
import { TPost, EnPostLanguage } from '../types/post';
import { TUser } from '../../user/types/user';
import {
  Box,
  Center,
  HStack,
  Spacer,
  Input,
  Button,
  Menu,
  MenuButton,
  IconButton,
  Tooltip,
  ButtonGroup
} from '@chakra-ui/react';
import UserAvatar from '../../user/avatar/components/UserAvatar';
import TbBookDownload from '../../../shared/components/icons/tabler/TbBookDownload';
import TbBookUpload from '../../../shared/components/icons/tabler/TbBookUpload';
import TbPhoto from '../../../shared/components/icons/tabler/TbPhoto';
import PostRatingButton from './PostRatingButton';
import TbLanguage from '../../../shared/components/icons/tabler/TbLanguage';
import TbDeviceIpadPlus from '../../../shared/components/icons/tabler/TbDeviceIpadPlus';
import TbDeviceFloppy from '../../../shared/components/icons/tabler/TbDeviceFloppy';
import TbEye from '../../../shared/components/icons/tabler/TbEye';
import TbEdit from '../../../shared/components/icons/tabler/TbEdit';

interface IPostTopNavProps {
  post?: TPost;
  isAuthor: boolean;
  author: TUser | null;
  mode: 'edit' | 'read';
  setMode: (mode: 'edit' | 'read') => void;
  handleRatePost: () => void;
  isRating?: boolean;
  savePost: () => void;
  isSavingPost: boolean;
}

/**
 * Top navigation for reading/editing a post.
 */
const PostTopNav: FC<IPostTopNavProps> = ({
  post,
  isAuthor,
  author,
  mode,
  setMode,
  handleRatePost,
  isRating,
  savePost,
  isSavingPost
}) => {
  return (
    <Center>
      <Box
        position="relative"
        w="full"
        border={'1px solid'}
        borderColor={'pages.singlePost.topNav.borderColor'}
        minW="fit-content"
        maxW="7xl"
        bgColor="pages.singlePost.topNav.bgColor"
        borderRadius="xl"
        py={3}
        px={5}
        my={5}
        mx={5}
        overflow="hidden"
      >
        <Center>
          <HStack
            w="full"
            maxW="7xl"
            justifyContent={{ base: 'center', sm: undefined }}
          >
            {author && (
              <UserAvatar
                user={author}
                size="sm"
                borderRadius="lg"
                showName
                nameProps={{ fontWeight: 'medium' }}
                redirectToProfile
                scaleOnHover
              />
            )}
            <Spacer display={{ base: 'none', sm: 'initial' }} />
            <HStack spacing={3} display={{ base: 'none', sm: 'flex' }}>
              {mode === 'read' && (
                <PostRatingButton
                  hasRated={post?.hasRated ?? false}
                  isRating={isRating ?? false}
                  toggleRating={handleRatePost}
                  stars={post?.stars ?? 0}
                  bgColor={'pages.singlePost.topNav.rating.bgColor'}
                  _hover={{
                    bgColor: 'pages.singlePost.topNav.rating._hover.bgColor'
                  }}
                />
              )}

              {isAuthor && (
                <ButtonGroup>
                  <Button
                    size="sm"
                    leftIcon={mode === 'read' ? <TbEdit /> : <TbEye />}
                    variant="outline"
                    onClick={() => {
                      setMode(mode === 'read' ? 'edit' : 'read');
                    }}
                  >
                    {mode === 'read' ? 'Edit' : 'Preview'}
                  </Button>
                  {mode === 'edit' && (
                    <Button
                      size="sm"
                      leftIcon={<TbDeviceFloppy />}
                      isLoading={isSavingPost}
                      loadingText="Saving..."
                      onClick={savePost}
                    >
                      Save
                    </Button>
                  )}
                </ButtonGroup>
              )}
            </HStack>
          </HStack>
        </Center>
      </Box>
    </Center>
  );
};

export default PostTopNav;
