import { FC } from 'react';
import { TPost, EnPostLanguage } from '../types/post';
import {
  Box,
  HStack,
  Input,
  Spacer,
  Switch,
  Tag,
  VStack,
  Text,
  Textarea,
  Divider
} from '@chakra-ui/react';
import Image from '../../../shared/components/image/Image';
import TbEdit from '../../../shared/components/icons/tabler/TbEdit';
import SelectMenu from '../../../shared/components/select-menu/SelectMenu';

interface IPostMobileMetaEditorProps {
  post?: TPost;
  canEdit?: boolean;
  isAuthor: boolean;
  handleTitleChange: (title: string) => void;
  handleSummaryChange: (summary: string) => void;
  setPostPreviewImage: (src: File) => void;
  isPostPreviewImageUploading: boolean;
  handleLanguageChange: (language: EnPostLanguage) => void;
  handleTogglePrivacy: () => void;
}

const PostMobileMetaEditor: FC<IPostMobileMetaEditorProps> = ({
  post,
  canEdit,
  isAuthor,
  handleTitleChange,
  handleSummaryChange,
  setPostPreviewImage,
  isPostPreviewImageUploading,
  handleLanguageChange,
  handleTogglePrivacy
}) => {
  const isPublic = post?.privacy === 'PUBLIC';
  const privacyLabel = isPublic ? 'public' : 'private';

  return (
    <VStack
      align={canEdit ? 'start' : 'initial'}
      maxW="7xl"
      mx={{ base: 5, md: 0 }}
      spacing={5}
      mt={3}
    >
      <HStack spacing={5} w={canEdit ? 'full' : 'initial'} h="full">
        <Image
          src={post?.avatarUrl || 'https://api.dicebear.com/7.x/shapes/svg'}
          boxSize="138px"
          borderRadius="lg"
          _hover={{
            transform: 'scale(1.05)'
          }}
          transition="transform 0.2s cubic-bezier(.17,.67,.83,.67)"
          handleImageChange={setPostPreviewImage}
          editable={canEdit}
          isUploading={isPostPreviewImageUploading}
        />
        <VStack align="start" h="full" flex={1} spacing={3}>
          <Box
            position="relative"
            __css={{
              '&:hover': {
                '& #editor-left-nav-edit-title-icon': {
                  opacity: 1
                }
              }
            }}
            w="full"
          >
            {canEdit ? (
              <>
                <Input
                  variant="outline"
                  size="sm"
                  placeholder="My Post"
                  defaultValue={post?.title ?? 'My Post'}
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
              <Box w="full">
                <Text size="sm" fontWeight="semibold">
                  {post?.title}
                </Text>
                <Text fontSize="sm" opacity={0.5}>
                  {post?.summary}
                </Text>
              </Box>
            )}
          </Box>
          {canEdit && (
            <>
              <HStack w="full">
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
              <HStack alignItems="center" w="full">
                <Text fontSize="sm" fontWeight="medium">
                  Post Language
                </Text>
                <Spacer />
                <SelectMenu
                  items={[
                    { label: 'EN', value: 'EN' },
                    { label: 'DE', value: 'DE' }
                  ]}
                  defaultValue={post?.language}
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
            </>
          )}
        </VStack>
      </HStack>
      {canEdit ? (
        <Textarea
          defaultValue={post?.summary ?? 'Short summary of your post'}
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
        <Divider mt={3} />
      )}
    </VStack>
  );
};

export default PostMobileMetaEditor;
