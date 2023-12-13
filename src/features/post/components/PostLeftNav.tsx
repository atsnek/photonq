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
  setViewMode: Dispatch<SetStateAction<TPostViewMode>>;
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
  setViewMode,
  handleSummaryChange,
  handleLanguageChange,
  setPostPreviewImage,
  isPostPreviewImageUploading,
  handleTogglePrivacy,
  handleSavePost
}) => {
  const navOffset = useNavOffset('90px');

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
      ml={{ base: 5, xl: 0 }}
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
          <Text size="sm" fontWeight="semibold">
            {post.title}
          </Text>
        </Box>
        <Divider mt={3} mb={3} />
        {canEdit && (
          <Heading as="h6" fontSize="sm" color="brand.500" fontWeight="medium">
            Post Summary
          </Heading>
        )}
        {canEdit ? (
          <Textarea
            defaultValue={post.summary ?? 'Short summary of your experiment'}
            placeholder="Short summary of your experiment"
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
          <Text
            size="sm"
            color="pages.singlePost.leftNav.summary.color"
            textAlign="justify"
          >
            {post.summary}
          </Text>
        )}

        {isAuthor && (
          <Box w="full">
            <HStack mt={3}>
              <Text fontSize="sm" fontWeight="medium">
                Post Privacy
              </Text>
              <Spacer />
              <Tag colorScheme={isPublic ? 'green' : 'yellow'} size="sm">
                {privacyLabel}
              </Tag>

              {canEdit && (
                <>
                  <Spacer />
                  <Switch
                    variant="privacy"
                    defaultChecked={isPublic}
                    onChange={handleTogglePrivacy}
                  />
                </>
              )}
            </HStack>
            {canEdit && (
              <Text size="sm" color="gray.500" w="full" mt={2}>
                Your experiment is{' '}
                {isPublic ? 'visible to everyone.' : 'only visible to you.'}
              </Text>
            )}
          </Box>
        )}

        <Box w="full" mt={2}>
          <HStack alignItems="center">
            <Text fontSize="sm" fontWeight="medium">
              Post Language
            </Text>
            <Spacer />
            {canEdit ? (
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
            ) : (
              <Tag size="sm">{Language[post.language]}</Tag>
            )}
          </HStack>
        </Box>

        {canEdit && <></>}
        {/* {isAuthor && (
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
        )} */}
      </VStack>
    </LeftNav>
  );
};

export default PostLeftNav;
