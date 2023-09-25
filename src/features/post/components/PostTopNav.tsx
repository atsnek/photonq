import { ChangeEvent, FC, useRef, useState } from 'react';
import { TPost, EnPostLanguage } from '../types/post';
import { TUser } from '../../user/types/user';
import {
  Box,
  Center,
  HStack,
  Spacer,
  Text,
  Input,
  Button,
  Menu,
  MenuButton
} from '@chakra-ui/react';
import UserAvatar from '../../user/avatar/components/UserAvatar';
import TbBookDownload from '../../../shared/components/icons/tabler/TbBookDownload';
import TbBookUpload from '../../../shared/components/icons/tabler/TbBookUpload';
import TbPhoto from '../../../shared/components/icons/tabler/TbPhoto';
import PostRatingButton from './PostRatingButton';
import TbLanguage from '../../../shared/components/icons/tabler/TbLanguage';
import PostLanguageMenuList from './PostLanguageMenuList';
import { useAppStore } from '../../../shared/store/store';
import TbDeviceIpadPlus from '../../../shared/components/icons/tabler/TbDeviceIpadPlus';

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
  isCreatingNewPost
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
        w="full"
        maxW="7xl"
        // borderBottom="1px solid"
        // borderBottomColor="topNav.borderColor"
        bgColor="gray.700"
        borderRadius="xl"
        py={3}
        px={5}
        my={5}
        display={{ base: 'none', md: 'block' }}
      >
        <Center>
          <HStack
            w="full"
            maxW="7xl"
            __css={{
              '& span img': {
                borderRadius: 'lg'
              }
            }}
          >
            {author && (
              <>
                {
                  <UserAvatar
                    user={author}
                    boxSize="30px"
                    showName
                    nameProps={{ fontWeight: 'medium' }}
                    redirectToProfile
                    scaleOnHover
                  />
                }
                {/* <Text fontWeight="medium">{author.displayName}</Text> */}
              </>
            )}
            <Spacer />
            <HStack spacing={3}>
              {!canEdit && (
                <PostRatingButton
                  hasRated={post?.hasRated ?? false}
                  isRating={isRating ?? false}
                  toggleRating={handleRatePost}
                  stars={post?.stars ?? 0}
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
                    <MenuButton
                      as={Button}
                      colorScheme="gray"
                      size="sm"
                      leftIcon={<TbLanguage />}
                    >
                      Language
                    </MenuButton>
                    <PostLanguageMenuList
                      currentLanguage={EnPostLanguage.ENGLISH}
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
                    <Button
                      colorScheme="gray"
                      size="sm"
                      leftIcon={
                        isPublic ? <TbBookDownload /> : <TbBookUpload />
                      }
                      onClick={handleTogglePrivacy}
                      isDisabled={isUpdatingPrivacy}
                    >
                      {isPublic ? 'Unpublish' : 'Publish'}
                    </Button>
                  )}
                </>
              )}
            </HStack>
          </HStack>
        </Center>
      </Box>
    </Center>
  );
};

export default PostTopNav;
function setPostPreviewImage(file: File) {
  throw new Error('Function not implemented.');
}
