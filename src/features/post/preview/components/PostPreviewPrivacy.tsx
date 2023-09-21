import { FC } from 'react';
import { TPostPrivacy } from '../../types/post';
import { Badge, BadgeProps } from '@chakra-ui/react';

interface IPostPreviewPrivacyProps extends BadgeProps {
  privacy: TPostPrivacy;
}

const PostPreviewPrivacy: FC<IPostPreviewPrivacyProps> = ({
  privacy,
  ...props
}) => {
  const isPrivate = privacy === 'PRIVATE';
  const privacyColor = isPrivate ? 'yellow' : 'green';
  return (
    <Badge
      variant="outline"
      size="sm"
      borderRadius="md"
      color={`components.badge.subtle.${privacyColor}.color`}
      bgColor={`components.badge.subtle.${privacyColor}.bgColor`}
      boxShadow="none"
      {...props}
    >
      {isPrivate ? 'Private' : 'Public'}
    </Badge>
  );
};

export default PostPreviewPrivacy;
