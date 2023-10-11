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
  Tooltip
} from '@chakra-ui/react';
import UserAvatar from '../../user/avatar/components/UserAvatar';
import TbBookDownload from '../../../shared/components/icons/tabler/TbBookDownload';
import TbBookUpload from '../../../shared/components/icons/tabler/TbBookUpload';
import TbPhoto from '../../../shared/components/icons/tabler/TbPhoto';
import PostRatingButton from './PostRatingButton';
import TbLanguage from '../../../shared/components/icons/tabler/TbLanguage';
import PostLanguageMenuList from './PostLanguageMenuList';
import TbDeviceIpadPlus from '../../../shared/components/icons/tabler/TbDeviceIpadPlus';
import TbDeviceFloppy from '../../../shared/components/icons/tabler/TbDeviceFloppy';

interface IPostTopNavProps {
  post?: TPost;
  author: TUser | null;
  handleTogglePrivacy: () => void;
  isUpdatingPrivacy?: boolean;
  setPostPreviewImage: (src: File) => void;
  isAuthor?: boolean;
  canEdit?: boolean;
  handleRatePost: () => void;
  isRating?: boolean;
  handleLanguageChange: (language: EnPostLanguage) => void;
  isNewPost: boolean;
  createNewPost: () => void;
  isCreatingNewPost: boolean;
  isSavingPost: boolean;
}

/**
 * Top navigation for reading/editing a post.
 */
const PostTopNav: FC<IPostTopNavProps> = ({
  post,
  author,
  handleTogglePrivacy,
  isUpdatingPrivacy,
  setPostPreviewImage,
  isAuthor,
  canEdit,
  handleRatePost,
  isRating,
  handleLanguageChange,
  isNewPost,
  createNewPost,
  isCreatingNewPost,
  isSavingPost
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget?.files || e.currentTarget.files?.length === 0) return;
    const file = e.currentTarget.files[0];
    setPostPreviewImage(file);
  };

  const isPublic = post?.privacy === 'PUBLIC';

  return (
    <Center>
      <Box
        position="relative"
        w="full"
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
          <HStack w="full" maxW="7xl" justifyContent={{ base: 'center', sm: undefined }}>
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
              {!canEdit && (
                <PostRatingButton
                  hasRated={post?.hasRated ?? false}
                  isRating={isRating ?? false}
                  toggleRating={handleRatePost}
                  stars={post?.stars ?? 0}
                  bgColor={!isAuthor ? 'pages.singlePost.topNav.rating.bgColor' : undefined}
                  _hover={
                    !isAuthor
                      ? {
                          bgColor: 'pages.singlePost.topNav.rating._hover.bgColor'
                        }
                      : undefined
                  }
                />
              )}
              <Input
                ref={imageInputRef}
                type="file"
                display="none"
                visibility="hidden"
                zIndex={-9999}
                accept="image/*"
                onChange={handleImageInputChange}
              />
              {canEdit && (
                <>
                  <Button
                    colorScheme="gray"
                    size="sm"
                    leftIcon={<TbPhoto />}
                    onClick={() => imageInputRef.current?.click()}
                  >
                    Image
                  </Button>
                  <Menu>
                    <MenuButton as={Button} colorScheme="gray" size="sm" leftIcon={<TbLanguage />}>
                      Language
                    </MenuButton>
                    <PostLanguageMenuList
                      currentLanguage={post?.language ?? EnPostLanguage.EN}
                      changeLanguage={handleLanguageChange}
                    />
                  </Menu>
                  {isNewPost ? (
                    <Button
                      colorScheme="gray"
                      size="sm"
                      leftIcon={<TbDeviceIpadPlus />}
                      onClick={createNewPost}
                      isDisabled={isCreatingNewPost}
                    >
                      Create post
                    </Button>
                  ) : (
                    <>
                      <Button
                        colorScheme="gray"
                        size="sm"
                        leftIcon={isPublic ? <TbBookDownload /> : <TbBookUpload />}
                        onClick={handleTogglePrivacy}
                        isDisabled={isUpdatingPrivacy}
                      >
                        {isPublic ? 'Unpublish' : 'Publish'}
                      </Button>
                    </>
                  )}
                </>
              )}
              {isAuthor && !isNewPost && (
                <Tooltip label="Posts are saved automatically">
                  <Button
                    colorScheme="gray"
                    bgColor=""
                    size="sm"
                    leftIcon={<TbDeviceFloppy />}
                    isLoading={isSavingPost}
                    loadingText="Saving..."
                  >
                    Save
                  </Button>
                </Tooltip>
              )}
            </HStack>
          </HStack>
        </Center>
      </Box>
    </Center>
  );
};

export default PostTopNav;
