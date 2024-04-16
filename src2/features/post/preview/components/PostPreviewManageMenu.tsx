import { Menu, MenuButton, Button, MenuList, MenuItem, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';
import { TPostPreview } from '../../types/post';
import TbBookUpload from '../../../../shared/components/icons/tabler/TbBookUpload';
import TbSquareRoundedX from '../../../../shared/components/icons/tabler/TbSquareRoundedX';

interface IPostPreviewManageMenuProps extends ButtonProps {
  postId: TPostPreview['id'];
  postPrivacy: TPostPreview['privacy'];
  togglePostPrivacy: (id: TPostPreview['id']) => void;
  isTogglingPostPrivacy: boolean;
  deletePost?: (id: TPostPreview['id']) => void;
  isDeletingPost?: boolean;
}

/**
 * Component for displaying a menu with actions for managing a post.
 */
const PostPreviewManageMenu: FC<IPostPreviewManageMenuProps> = ({
  postId,
  postPrivacy,
  togglePostPrivacy,
  isTogglingPostPrivacy,
  deletePost,
  isDeletingPost,
  ...props
}) => {
  const isPostPrivate = postPrivacy === 'PRIVATE';

  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        variant="outline-hover-filled"
        minW="fit-content"
        {...props}
      >
        Manage
      </MenuButton>
      <MenuList zIndex={999}>
        <MenuItem
          onClick={() => togglePostPrivacy(postId)}
          isDisabled={isTogglingPostPrivacy}
          icon={isPostPrivate ? <TbBookUpload /> : <TbBookUpload />}
        >
          {isPostPrivate ? 'Set public' : 'Set private'}
        </MenuItem>
        {deletePost && (
          <MenuItem
            icon={<TbSquareRoundedX />}
            onClick={() => deletePost(postId)}
            isDisabled={isDeletingPost}
            _hover={{ bg: 'rgba(255, 0, 0, 0.5)' }}
            transition="background-color 0.2s"
          >
            Delete
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default PostPreviewManageMenu;
