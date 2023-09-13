import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { FC, useState } from 'react';
import ActionToolbar from '../../../shared/components/action-toolbar/ActionToolbar';
import { TActionToolbarItem } from '../../../shared/components/action-toolbar/types/actionToolbar';
import TbBookDownload from '../../../shared/components/icons/tabler/TbBookDownload';
import TbBookUpload from '../../../shared/components/icons/tabler/TbBookUpload';
import TbDeviceFloppy from '../../../shared/components/icons/tabler/TbDeviceFloppy';
import TbPhoto from '../../../shared/components/icons/tabler/TbPhoto';
import useScrollPosition from '../../../shared/hooks/use-scroll-position';
import { TPost, TPostViewMode } from '../types/post';
import TbEdit from '../../../shared/components/icons/tabler/TbEdit';
import TbEye from '../../../shared/components/icons/tabler/TbEye';

interface IPostActionToolbarProps {
  viewMode?: TPostViewMode;
  toggleViewMode?: () => void;
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
  handleTogglePrivacy,
  isTogglingPrivacy
}) => {
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
  }

  if (toggleViewMode && (canEdit || viewMode === 'read')) {
    const isEditing = viewMode === 'edit';
    actionToolbarItems.push({
      order: 0,
      icon: isEditing ? <TbEye /> : <TbEdit />,
      ariaLabel: isEditing ? 'Edit this post' : 'Edit this post',
      tooltip: isEditing ? 'Edit this post' : 'Edit this post',
      onClick: toggleViewMode,
      hoverColor: 'components.postEditor.edit.hover.color'
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
