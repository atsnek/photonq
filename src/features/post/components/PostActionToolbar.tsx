import { useBreakpointValue } from '@chakra-ui/react';
import { FC } from 'react';
import ActionToolbar from '../../../shared/components/action-toolbar/ActionToolbar';
import { TActionToolbarItem } from '../../../shared/components/action-toolbar/types/actionToolbar';
import TbBookDownload from '../../../shared/components/icons/tabler/TbBookDownload';
import TbBookUpload from '../../../shared/components/icons/tabler/TbBookUpload';
import TbDeviceFloppy from '../../../shared/components/icons/tabler/TbDeviceFloppy';
import TbPhoto from '../../../shared/components/icons/tabler/TbPhoto';
import useScrollPosition from '../../../shared/hooks/use-scroll-position';
import { TPostViewMode } from '../types/post';
import TbEdit from '../../../shared/components/icons/tabler/TbEdit';
import TbEye from '../../../shared/components/icons/tabler/TbEye';
import TbStar from '../../../shared/components/icons/tabler/TbStar';
import { useAuthenticationContext } from '@atsnek/jaen';

interface IPostActionToolbarProps {
  viewMode?: TPostViewMode;
  toggleViewMode?: () => void;
  toggleRating: () => void;
  hasRated: boolean;
  isRating: boolean;
  isPublic?: boolean;
  canEdit?: boolean;
  handleTogglePrivacy?: () => void;
  isTogglingPrivacy?: boolean;
}

const PostActionToolbar: FC<IPostActionToolbarProps> = ({
  viewMode,
  toggleViewMode,
  isPublic,
  canEdit,
  hasRated,
  toggleRating,
  handleTogglePrivacy,
  isTogglingPrivacy
}) => {
  const isAuthenticated = useAuthenticationContext().user !== null;
  const scrollPosition = useScrollPosition();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const deviceSpecificActionToolbarItems =
    useBreakpointValue<TActionToolbarItem[]>({
      base: [
        {
          order: 1,
          icon: <TbPhoto fontSize="xl" />,
          onClick: () => console.log('Upload new image'),
          tooltip: 'Upload new image',
          ariaLabel: 'Upload new image'
        }
      ],
      md: []
    }) ?? [];

  const actionToolbarItems: TActionToolbarItem[] = [];

  if (canEdit) {
    if (handleTogglePrivacy) {
      actionToolbarItems.push(
        {
          order: 1,
          icon: <TbDeviceFloppy />,
          ariaLabel: 'Save this post',
          tooltip: 'Save this post',
          onClick: () => console.log('Save'),
          hoverColor: 'components.postEditor.save.hover.color'
        },
        {
          order: 2,
          icon: isPublic ? <TbBookDownload /> : <TbBookUpload />,
          ariaLabel: isPublic ? 'Unpublish this post' : 'Publish this post',
          tooltip: isPublic ? 'Unpublish this post' : 'Publish this post',
          onClick: handleTogglePrivacy,
          hoverColor: 'components.postEditor.publish.hover.color',
          disabled: isTogglingPrivacy
        }
      );
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
        disabled: isTogglingPrivacy,
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
      ariaLabel: isEditing ? 'Edit this post' : 'Preview this post',
      tooltip: isEditing ? 'Edit this post' : 'Preview this post',
      onClick: toggleViewMode,
      hoverColor: 'components.postEditor.viewMode.hover.color'
    });
  }

  return (
    <ActionToolbar
      active={isMobile || scrollPosition > 90 || true}
      actions={[...deviceSpecificActionToolbarItems, ...actionToolbarItems]}
    />
  );
};

export default PostActionToolbar;
