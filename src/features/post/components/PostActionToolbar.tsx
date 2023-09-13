import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { FC, useState } from 'react';
import ActionToolbar from '../../../shared/components/action-toolbar/ActionToolbar';
import { TActionToolbarItem } from '../../../shared/components/action-toolbar/types/actionToolbar';
import TbBookDownload from '../../../shared/components/icons/tabler/TbBookDownload';
import TbBookUpload from '../../../shared/components/icons/tabler/TbBookUpload';
import TbDeviceFloppy from '../../../shared/components/icons/tabler/TbDeviceFloppy';
import TbPhoto from '../../../shared/components/icons/tabler/TbPhoto';
import useScrollPosition from '../../../shared/hooks/use-scroll-position';
import { TPost } from '../types/post';

interface IPostActionToolbarProps {
  isPublic?: boolean;
  canEdit?: boolean;
  handleTogglePrivacy?: () => void;
  isTogglingPrivacy?: boolean;
}

const PostActionToolbar: FC<IPostActionToolbarProps> = ({
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
          icon: <TbPhoto fontSize="xl" />,
          onClick: () => console.log('Upload new image'),
          tooltip: 'Upload new image',
          ariaLabel: 'Upload new image'
        }
      ],
      md: []
    }) ?? [];

  const actionToolbarItems: TActionToolbarItem[] = [
    {
      icon: <TbDeviceFloppy />,
      ariaLabel: 'Save this post',
      tooltip: 'Save this post',
      onClick: () => console.log('Save'),
      hoverColor: 'components.postEditor.save.hover.color'
    }
  ];

  if (canEdit) {
    if (handleTogglePrivacy) {
      actionToolbarItems.push({
        icon: isPublic ? <TbBookDownload /> : <TbBookUpload />,
        ariaLabel: isPublic ? 'Unpublish this post' : 'Publish this post',
        tooltip: isPublic ? 'Unpublish this post' : 'Publish this post',
        onClick: handleTogglePrivacy,
        hoverColor: 'components.postEditor.publish.hover.color',
        disabled: isTogglingPrivacy
      });
    }
  }

  return (
    <ActionToolbar
      active={isMobile || scrollPosition > 90}
      actions={[...deviceSpecificActionToolbarItems, ...actionToolbarItems]}
    />
  );
};

export default PostActionToolbar;
