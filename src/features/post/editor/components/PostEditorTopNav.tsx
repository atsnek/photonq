import {
  Box,
  Button,
  Center,
  HStack,
  Spacer,
  Text,
  Input,
  useDisclosure
} from '@chakra-ui/react';
import { ChangeEvent, FC, useRef } from 'react';
import { TPost } from '../../types/post';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';
import TbBookUpload from '../../../../shared/components/icons/tabler/TbBookUpload';
import TbBookDownload from '../../../../shared/components/icons/tabler/TbBookDownload';
import TbPhoto from '../../../../shared/components/icons/tabler/TbPhoto';
import UserAvatar from '../../../user/avatar/components/UserAvatar';
import { SnekUser } from '@atsnek/jaen';
import { getUserDisplayname } from '../../../user/utils/user';

interface IPostEditorTopNavProps {
  post: Partial<TPost>;
  user: SnekUser | null;
  handlePublish: () => void;
  setPostPreviewImage: (src: File) => void;
}

/**
 * Top navigation for the post editor.
 */
const PostEditorTopNav: FC<IPostEditorTopNavProps> = ({
  post,
  handlePublish,
  user,
  setPostPreviewImage
}) => {
  const topNavDisclosure = useDisclosure();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const isPublic = post.publicationDate !== undefined;

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget?.files || e.currentTarget.files?.length === 0) return;
    const file = e.currentTarget.files[0];
    setPostPreviewImage(file);
  };

  return (
    <>
      {/* <TopNav drawerDisclosure={topNavDisclosure} /> */}
      <Box
        w="full"
        borderBottom="1px solid"
        borderBottomColor="topNav.borderColor"
        bgColor="shared.translucent.bgColor"
        py={3}
        mb={5}
        display={{ base: 'none', md: 'block' }}
      >
        <Center>
          <HStack w="full" maxW="7xl">
            {user && (
              <>
                {
                  <UserAvatar
                    user={user}
                    boxSize="30px"
                    redirectToProfile
                    scaleOnHover
                  />
                }
                <Text fontWeight="medium">{getUserDisplayname(user)}</Text>
              </>
            )}
            <Spacer />
            <HStack spacing={3}>
              <Button colorScheme="gray" size="sm" leftIcon={<TbStar />}>
                {post.likes || 0}
              </Button>
              <Input
                ref={imageInputRef}
                type="file"
                display="none"
                visibility="hidden"
                zIndex={-9999}
                accept="image/*"
                onChange={handleImageInputChange}
              />
              <Button
                colorScheme="gray"
                size="sm"
                leftIcon={<TbPhoto />}
                onClick={() => imageInputRef.current?.click()}
              >
                Image
              </Button>
              <Button
                colorScheme="gray"
                size="sm"
                leftIcon={isPublic ? <TbBookDownload /> : <TbBookUpload />}
                onClick={isPublic ? handlePublish : handlePublish}
              >
                {isPublic ? 'Unpublish' : 'Publish'}
              </Button>
            </HStack>
          </HStack>
        </Center>
      </Box>
    </>
  );
};

export default PostEditorTopNav;
