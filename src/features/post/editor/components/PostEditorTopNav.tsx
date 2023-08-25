import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Spacer,
  Tag,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { FC } from 'react';
import TopNav from '../../../../shared/containers/navigation/TopNav';
import { TPost } from '../../types/post';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';
import TbBookUpload from '../../../../shared/components/icons/tabler/TbBookUpload';
import TbBookDownload from '../../../../shared/components/icons/tabler/TbBookDownload';
import TbPhoto from '../../../../shared/components/icons/tabler/TbPhoto';
import { TUser } from '../../../user/types/user';
import UserAvatar from '../../../user/avatar/components/UserAvatar';

interface IPostEditorTopNavProps {
  post: Partial<TPost>;
  user: TUser;
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
      <TopNav drawerDisclosure={topNavDisclosure} />
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
            <UserAvatar
              user={user}
              boxSize="30px"
              redirectToProfile
              scaleOnHover
            />
            <Text fontWeight="medium">{user.displayName}</Text>
            <Spacer />
            <HStack spacing={3}>
              <Button size="sm" leftIcon={<TbStar />}>
                {post.likes || 0}
              </Button>
              <Button size="sm" leftIcon={<TbPhoto />}>
                Image
              </Button>
              {isPublic ? (
                <Button
                  size="sm"
                  leftIcon={<TbBookDownload />}
                  onClick={handlePublish}
                >
                  Unpublish
                </Button>
              ) : (
                <Button
                  size="sm"
                  leftIcon={<TbBookUpload />}
                  onClick={handlePublish}
                >
                  Publish
                </Button>
              )}
            </HStack>
          </HStack>
        </Center>
      </Box>
    </>
  );
};

export default PostEditorTopNav;
