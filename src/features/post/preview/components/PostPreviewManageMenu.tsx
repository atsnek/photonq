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
import TbBookUpload from '../../../../shared/components/icons/tabler/TbBookUpload';

interface IPostPreviewManageMenuProps extends ButtonProps {
  postId: TPostPreview['id'];
  postPrivacy: TPostPreview['privacy'];
  togglePostPrivacy: (id: TPostPreview['id']) => void;
  isTogglingPostPrivacy: boolean;
}

/**
 * Component for displaying a menu with actions for managing a post.
 */
const PostPreviewManageMenu: FC<IPostPreviewManageMenuProps> = ({
  postId,
  postPrivacy,
  togglePostPrivacy,
  isTogglingPostPrivacy,
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
          {isPostPrivate ? 'Publish' : 'Unpublish'}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PostPreviewManageMenu;
