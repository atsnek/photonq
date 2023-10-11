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
  isNewPost?: boolean;
  toggleViewMode?: () => void;
  toggleRating: () => void;
  hasRated: boolean;
  isRating: boolean;
  isPublic?: boolean;
  canEdit?: boolean;
  setPostPreviewImage?: (src: File) => void;
  handleTogglePrivacy?: () => void;
  isTogglingPrivacy?: boolean;
  createNewPost: () => void;
  isCreatingNewPost: boolean;
  handleDeletePost?: () => void;
  isDeletingPost?: boolean;
}

/**
 * Action toolbar for reading/editing a post.
 */
const PostActionToolbar: FC<IPostActionToolbarProps> = ({
  viewMode,
  isNewPost,
  toggleViewMode,
  isPublic,
  canEdit,
  hasRated,
  toggleRating,
  setPostPreviewImage,
  handleTogglePrivacy,
  isTogglingPrivacy,
  createNewPost,
  isCreatingNewPost,
  handleDeletePost,
  isDeletingPost
}) => {
  const isAuthenticated = useAuthenticationContext().user !== null;
  const scrollPosition = useScrollPosition();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const previewImageInputRef = useRef<HTMLInputElement>(null);

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget?.files || e.currentTarget.files?.length === 0 || !setPostPreviewImage)
      return;
    const file = e.currentTarget.files[0];
    setPostPreviewImage(file);
  };

  const actionToolbarItems: TActionToolbarItem[] = [];

  const areActionsDisabled = isDeletingPost;

  if (canEdit) {
    if (handleTogglePrivacy) {
      actionToolbarItems.push({
        order: 1,
        icon: <TbPhoto fontSize="xl" />,
        onClick: () => previewImageInputRef.current?.click(),
        tooltip: 'Upload new image',
        ariaLabel: 'Upload new image',
        disabled: areActionsDisabled
      });
      if (!isNewPost) {
        actionToolbarItems.push(
          {
            order: 2,
            icon: isPublic ? <TbBookDownload /> : <TbBookUpload />,
            ariaLabel: isPublic ? 'Unpublish this post' : 'Publish this post',
            tooltip: isPublic ? 'Unpublish this post' : 'Publish this post',
            onClick: handleTogglePrivacy,
            hoverColor: 'components.postEditor.publish.hover.color',
            disabled: isTogglingPrivacy || areActionsDisabled
          },
          {
            order: 3 // Divider Item
          },
          {
            order: 3,
            icon: <TbSquareRoundedX />,
            ariaLabel: 'Delete post',
            tooltip: 'Delete post',
            onClick: handleDeletePost,
            disabled: isDeletingPost || areActionsDisabled,
            hoverColor: 'components.postEditor.delete.hover.color'
          },
          {
            order: 2,
            icon: <TbDeviceFloppy />,
            ariaLabel: 'Save this post',
            tooltip: 'Posts are saved automatically.',
            onClick: () => {},
            hoverColor: 'components.postEditor.save.hover.color'
          }
        );
      } else {
        actionToolbarItems.push({
          order: 1,
          ariaLabel: 'Create new post',
          tooltip: 'Create new post',
          icon: <TbDeviceIpadPlus />,
          onClick: createNewPost,
          disabled: isCreatingNewPost || areActionsDisabled,
          hoverColor: 'components.postEditor.save.hover.color'
        });
      }
    }
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
        disabled: isTogglingPrivacy || areActionsDisabled,
        tooltip: hasRated ? 'Unrate this post' : 'Rate this post',
        ariaLabel: hasRated ? 'Unrated this post' : 'Rate this post',
        hoverColor: 'components.postEditor.rate.hover.color'
      });
    }
  }

  if (toggleViewMode && canEdit) {
    const isEditing = viewMode === 'edit';
    actionToolbarItems.push({
      order: 0,
      icon: isEditing ? <TbEye /> : <TbEdit />,
      ariaLabel: isEditing ? 'Preview this post' : 'Edit this post',
      tooltip: isEditing ? 'Preview this post' : 'Edit this post',
      onClick: toggleViewMode,
      disabled: areActionsDisabled,
      hoverColor: 'components.postEditor.viewMode.hover.color'
    });
  }

  //TODO: Outsource the image input to a separate component
  return (
    <>
      <Input
        type="file"
        ref={previewImageInputRef}
        accept=".jpg,.jpeg,.png,.gif"
        visibility="hidden"
        display="none"
        zIndex={-999}
        opacity={0}
        onChange={handleImageInputChange}
      />
      <ActionToolbar
        active={isMobile || scrollPosition > 90 || true}
        actions={[...actionToolbarItems]}
      />
    </>
  );
};

export default PostActionToolbar;
