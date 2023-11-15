import { Dispatch, FC, SetStateAction } from 'react';
import { EnPostLanguage, TPost, TPostViewMode } from '../types/post';
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Input,
  Menu,
  Spacer,
  Switch,
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
import { Language } from '@snek-functions/origin/dist/schema.generated';
import TbDeviceFloppy from '../../../shared/components/icons/tabler/TbDeviceFloppy';
import SelectMenu from '../../../shared/components/select-menu/SelectMenu';

interface IPostLeftNavProps {
  post?: TPost;
  canEdit?: boolean;
  isAuthor: boolean;
  viewMode: TPostViewMode;
  setViewMode: Dispatch<SetStateAction<TPostViewMode>>;
  handleTitleChange: (title: string) => void;
  handleSummaryChange: (summary: string) => void;
  setPostPreviewImage: (src: File) => void;
  isPostPreviewImageUploading: boolean;
  handleLanguageChange: (language: EnPostLanguage) => void;
  handleTogglePrivacy: () => void;
  handleSavePost: () => void;
}

/**
 * Left navigation for reading/editing a post.
 */
const PostLeftNav: FC<IPostLeftNavProps> = ({
  post,
  canEdit,
  isAuthor,
  viewMode,
  setViewMode,
  handleTitleChange,
  handleSummaryChange,
  handleLanguageChange,
  setPostPreviewImage,
  isPostPreviewImageUploading,
  handleTogglePrivacy,
  handleSavePost
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
      minH="420px"
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
                variant="outline"
                size="sm"
                placeholder="My Post"
                defaultValue={post.title ?? 'My Post'}
                textAlign="center"
                px={8}
                fontWeight="semibold"
                borderRadius="md"
                onBlur={e => handleTitleChange(e.target.value)}
                colorScheme="brand"
                _focusVisible={{
                  borderWidth: 2,
                  borderColor: 'brand.500'
                }}
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
        {canEdit && (
          <>
            <Box w="full">
              <HStack mt={3}>
                <Text fontSize="sm" fontWeight="medium">
                  Post Privacy
                </Text>
                <Tag colorScheme={isPublic ? 'green' : 'yellow'} size="sm">
                  {privacyLabel}
                </Tag>
                <Spacer />
                <Switch
                  variant="privacy"
                  defaultChecked={isPublic}
                  onChange={handleTogglePrivacy}
                />
              </HStack>
              <Text size="sm" color="gray.500" w="full" mt={2}>
                Your post is {isPublic ? 'visible to everyone.' : 'only visible to you.'}
              </Text>
            </Box>
            <Box w="full" mt={2}>
              <HStack alignItems="center">
                <Text fontSize="sm" fontWeight="medium">
                  Post Language
                </Text>
                <Spacer />
                <SelectMenu
                  items={[
                    { label: 'EN', value: 'EN' },
                    { label: 'DE', value: 'DE' }
                  ]}
                  defaultValue={post.language}
                  onChange={lang =>
                    handleLanguageChange(
                      lang in EnPostLanguage
                        ? EnPostLanguage[lang as keyof typeof EnPostLanguage]
                        : EnPostLanguage.EN
                    )
                  }
                  buttonLabel="Language"
                  buttonProps={{
                    size: 'sm',
                    colorScheme: 'gray'
                  }}
                  listProps={{
                    minW: 'fit-content'
                  }}
                />
              </HStack>
            </Box>
            <Divider mt={3} mb={3} />
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
            outline="1px solid"
            outlineColor="components.textarea.borderColor"
            size="sm"
            borderRadius="lg"
            textAlign="center"
            variant="ghost"
            maxH="300px"
            onBlur={e => handleSummaryChange(e.target.value)}
            _hover={{
              outlineColor: 'components.textarea._hover.borderColor'
            }}
            _focusVisible={{
              outlineWidth: 2,
              outlineColor: 'components.textarea._focus.borderColor'
            }}
            transition="outline 0.1s ease-in-out"
          />
        ) : (
          <Text size="sm" color="pages.singlePost.leftNav.summary.color" textAlign="justify">
            {post.summary}
          </Text>
        )}
        {isAuthor && (
          <Button
            w="full"
            colorScheme="gray"
            size="sm"
            leftIcon={canEdit ? <TbDeviceFloppy /> : <TbEdit />}
            onClick={() => {
              if (canEdit) handleSavePost();
              setViewMode(canEdit ? 'read' : 'edit');
            }}
          >
            {canEdit ? 'Finish editing' : 'Edit post'}
          </Button>
        )}
      </VStack>
    </LeftNav>
  );
};

export default PostLeftNav;
