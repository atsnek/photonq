import { FC } from 'react';
import { EnPostLanguage, TPost } from '../types/post';
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Input,
  Menu,
  MenuButton,
  Tag,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';
import TbEdit from '../../../shared/components/icons/tabler/TbEdit';
import LeftNav from '../../../shared/containers/navigation/LeftNav';
import { useNavOffset } from '../../../shared/hooks/use-nav-offset';
import Image from '../../../shared/components/image/Image';
import LeftNavPostReaderSkeleton from '../reader/components/LeftNavPostReaderSkeleton';
import { useAuthenticationContext } from '@atsnek/jaen';
import PostLanguageMenuList from './PostLanguageMenuList';

interface IPostLeftNavProps {
  post?: TPost;
  isPostAuthor: boolean;
  canEdit?: boolean;
  handleTitleChange: (title: string) => void;
  handleSummaryChange: (summary: string) => void;
  setPostPreviewImage: (src: File) => void;
  isPostPreviewImageUploading: boolean;
  handleLanguageChange: (language: EnPostLanguage) => void;
  handleTogglePrivacy: () => void;
  isUpdatingPrivacy: boolean;
}

/**
 * Left navigation for reading/editing a post.
 */
const PostLeftNav: FC<IPostLeftNavProps> = ({
  post,
  isPostAuthor,
  canEdit,
  handleTitleChange,
  handleSummaryChange,
  setPostPreviewImage,
  isPostPreviewImageUploading,
  handleLanguageChange,
  handleTogglePrivacy,
  isUpdatingPrivacy
}) => {
  const navOffset = useNavOffset();

  const isAuthenticated = useAuthenticationContext().user !== null;

  if (!post) return <LeftNavPostReaderSkeleton />;

  const isPublic = post?.privacy === 'PUBLIC';
  const privacyLabel = isPublic ? 'public' : 'private';

  return (
    <LeftNav
      minW="250px"
      maxW="5rem"
      w="max-content"
      isExpanded={true}
      display={{ base: 'none', md: 'flex' }}
      top={isAuthenticated ? `${navOffset}` : '85px'}
      h={`calc(100vh - 100px  - ${navOffset})`}
      mr={10}
    >
      <VStack
        spacing={4}
        __css={{
          '& img': {
            // We need this to force the image to be a square
            h: 'auto',
            aspectRatio: '1 / 1',
            objectPosition: 'top'
          }
        }}
      >
        <Image
          src={post?.avatarUrl || 'https://api.dicebear.com/7.x/shapes/svg'}
          boxSize="3xs"
          borderRadius="full"
          _hover={{
            transform: 'scale(1.05)'
          }}
          transition="transform 0.2s cubic-bezier(.17,.67,.83,.67)"
          handleImageChange={setPostPreviewImage}
          editable={canEdit}
          isUploading={isPostPreviewImageUploading}
        />
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
          {canEdit ? (
            <>
              <Input
                variant="ghost"
                size="sm"
                placeholder="My Post"
                defaultValue={post.title ?? 'My Post'}
                textAlign="center"
                px={8}
                fontWeight="semibold"
                borderRadius="md"
                onBlur={e => handleTitleChange(e.target.value)}
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
            </>
          ) : (
            <Text size="sm" fontWeight="semibold">
              {post.title}
            </Text>
          )}
        </Box>
        {isPostAuthor && !canEdit && post.privacy === 'PRIVATE' && (
          <Tag size="sm" colorScheme="yellow">
            private
          </Tag>
        )}
        {canEdit && (
          <>
            <HStack>
              <Tag
                h="auto"
                as={Button}
                size="sm"
                colorScheme={isPublic ? 'green' : 'yellow'}
                _hover={{
                  bg: `pages.singlePost.leftNav.tags.privacy.${privacyLabel}.hover.bgColor`,
                  color: `pages.singlePost.leftNav.tags.privacy.${privacyLabel}.hover.color`
                }}
                onClick={handleTogglePrivacy}
                isDisabled={isUpdatingPrivacy}
              >
                {privacyLabel}
              </Tag>
              <Menu>
                <MenuButton
                  as={Tag}
                  size="sm"
                  h="fit-content"
                  colorScheme="gray"
                  _hover={{
                    bg: 'pages.singlePost.leftNav.tags.language.hover.bgColor'
                  }}
                  cursor="pointer"
                >
                  {post.language === 'EN' ? '🇺🇸' : '🇦🇹'}
                </MenuButton>
                <PostLanguageMenuList
                  changeLanguage={handleLanguageChange}
                  currentLanguage={post.language}
                  compactMode
                />
              </Menu>
            </HStack>
            <Divider mt={8} mb={3} />
          </>
        )}
        {post.summary && canEdit && (
          <Heading as="h6" fontSize="sm" color="brand.500" fontWeight="medium">
            Post Summary
          </Heading>
        )}
        {canEdit ? (
          <Textarea
            defaultValue={post.summary ?? 'Short summary of your post'}
            placeholder="Short summary of your post"
            size="sm"
            borderRadius="lg"
            textAlign="center"
            variant="ghost"
            maxH="300px"
            onBlur={e => handleSummaryChange(e.target.value)}
          />
        ) : (
          <Text size="sm" color="pages.singlePost.leftNav.summary.color" textAlign="justify">
            {post.summary}
          </Text>
        )}
      </VStack>
    </LeftNav>
  );
};

export default PostLeftNav;
