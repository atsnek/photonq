import { Input, useBreakpointValue } from '@chakra-ui/react';
import { ChangeEvent, FC, useRef } from 'react';
import ActionToolbar from '../../../shared/components/action-toolbar/ActionToolbar';
import { TActionToolbarItem } from '../../../shared/components/action-toolbar/types/actionToolbar';
import TbBookDownload from '../../../shared/components/icons/tabler/TbBookDownload';
import TbBookUpload from '../../../shared/components/icons/tabler/TbBookUpload';
import TbPhoto from '../../../shared/components/icons/tabler/TbPhoto';
import useScrollPosition from '../../../shared/hooks/use-scroll-position';
import { TPostViewMode } from '../types/post';
import TbEdit from '../../../shared/components/icons/tabler/TbEdit';
import TbEye from '../../../shared/components/icons/tabler/TbEye';
import TbStar from '../../../shared/components/icons/tabler/TbStar';
import { useAuthenticationContext } from '@atsnek/jaen';
import TbDeviceIpadPlus from '../../../shared/components/icons/tabler/TbDeviceIpadPlus';
import TbSquareRoundedX from '../../../shared/components/icons/tabler/TbSquareRoundedX';
import TbDeviceFloppy from '../../../shared/components/icons/tabler/TbDeviceFloppy';

interface IPostActionToolbarProps {
  viewMode?: TPostViewMode;
  toggleViewMode?: () => void;
  toggleRating: () => void;
  hasRated: boolean;
  isRating: boolean;
  canEdit?: boolean;
  savePost: () => void;
  isSavingPost: boolean;
  handleDeletePost?: () => void;
  isDeletingPost?: boolean;
}

/**
 * Action toolbar for reading/editing a post.
 */
const PostActionToolbar: FC<IPostActionToolbarProps> = ({
  viewMode,
  toggleViewMode,
  canEdit,
  hasRated,
  toggleRating,
  handleDeletePost,
  savePost,
  isSavingPost,
  isDeletingPost
}) => {
  const isAuthenticated = useAuthenticationContext().user !== null;
  const scrollPosition = useScrollPosition();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const previewImageInputRef = useRef<HTMLInputElement>(null);

  const actionToolbarItems: TActionToolbarItem[] = [];

  const areActionsDisabled = isDeletingPost;

  if (canEdit) {
    actionToolbarItems.push({
      order: 3,
      icon: <TbSquareRoundedX />,
      ariaLabel: 'Delete experiment',
      tooltip: 'Delete experiment',
      onClick: handleDeletePost,
      disabled: isDeletingPost || areActionsDisabled,
      hoverColor: 'components.postEditor.delete.hover.color'
    });
  } else {
    if (isAuthenticated) {
      actionToolbarItems.push({
        order: 1,
        icon: (
          <TbStar
            fill={hasRated ? 'features.rating.rated.color' : 'transparent'}
            stroke={hasRated ? 'features.rating.rated.color' : 'currentColor'}
          />
        ),
        onClick: toggleRating,
        disabled: areActionsDisabled,
        tooltip: hasRated ? 'Unrate this experiment' : 'Rate this experiment',
        ariaLabel: hasRated
          ? 'Unrated this experiment'
          : 'Rate this experiment',
        hoverColor: 'components.postEditor.rate.hover.color'
      });
    }
  }

  if (viewMode === 'edit' && canEdit) {
    actionToolbarItems.push({
      order: 1,
      ariaLabel: 'Save this experiment',
      tooltip: 'Save this experiment',
      icon: <TbDeviceFloppy />,
      onClick: savePost,
      disabled: areActionsDisabled,
      hoverColor: 'components.postEditor.save.hover.color'
    });
  }

  if (toggleViewMode && canEdit) {
    const isEditing = viewMode === 'edit';
    actionToolbarItems.push({
      order: 0,
      icon: isEditing ? <TbEye /> : <TbEdit />,
      ariaLabel: isEditing ? 'Preview this experiment' : 'Edit this experiment',
      tooltip: isEditing ? 'Preview this experiment' : 'Edit this experiment',
      onClick: toggleViewMode,
      disabled: areActionsDisabled,
      hoverColor: 'components.postEditor.viewMode.hover.color'
    });
  }

  //TODO: Outsource the image input to a separate component
  return (
    <>
      <ActionToolbar
        active={isMobile || scrollPosition > 90 || true}
        actions={[...actionToolbarItems]}
      />
    </>
  );
};

export default PostActionToolbar;
