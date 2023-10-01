import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  ButtonProps
} from '@chakra-ui/react';
import { FC } from 'react';
import { TPostPreview } from '../../types/post';

interface IPostPreviewManageMenuProps extends ButtonProps {
  postId?: TPostPreview['id'];
  postPrivacy: TPostPreview['privacy'];
  togglePostPrivacy: (id: TPostPreview['id']) => void;
}

/**
 * Component for displaying a menu with actions for managing a post.
 */
const PostPreviewManageMenu: FC<IPostPreviewManageMenuProps> = ({
  postId,
  postPrivacy,
  togglePostPrivacy,
  ...props
}) => {
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
        <MenuItem>
          {postPrivacy === 'PRIVATE' ? 'Publish' : 'Unpublish'}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PostPreviewManageMenu;
