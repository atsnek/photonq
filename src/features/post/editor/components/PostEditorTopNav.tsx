import {
  Box,
  Button,
  Center,
  HStack,
  Spacer,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { FC } from 'react';
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
}

/**
 * Top navigation for the post editor.
 */
const PostEditorTopNav: FC<IPostEditorTopNavProps> = ({
  post,
  handlePublish,
  user
}) => {
  const topNavDisclosure = useDisclosure();
  const isPublic = post.publicationDate !== undefined;
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
              <Button colorScheme="gray" size="sm" leftIcon={<TbPhoto />}>
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
