import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  ButtonProps
} from '@chakra-ui/react';
import { FC } from 'react';

interface IPostPreviewManageMenuProps extends ButtonProps {}

/**
 * Component for displaying a menu with actions for managing a post.
 */
const PostPreviewManageMenu: FC<IPostPreviewManageMenuProps> = ({
  ...props
}) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        variant="outline-hover-filled"
        {...props}
      >
        Manage
      </MenuButton>
      <MenuList zIndex={999}>
        {
          //TODO: Add some handy actions here
        }
        <MenuItem>Action 1</MenuItem>
        <MenuItem>Action 2</MenuItem>
        <MenuItem>Action 3</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PostPreviewManageMenu;
