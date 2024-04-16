import { FC } from 'react';
import {
  Avatar,
  AvatarProps,
  HStack,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  LinkOverlayProps,
  Tooltip
} from '@chakra-ui/react';
import UserPreview from './UserPreview';
import { TUser } from '../../types/user';
import Link from '../../../../shared/components/Link';

export interface IUserAvatarProps extends AvatarProps {
  user: TUser;
  showName?: boolean;
  nameProps?: LinkOverlayProps;
  showTooltip?: boolean;
  redirectToProfile?: boolean;
  scaleOnHover?: boolean;
}

const UserAvatar: FC<IUserAvatarProps> = ({
  user,
  showName,
  nameProps,
  showTooltip,
  redirectToProfile,
  scaleOnHover,
  ...props
}) => {
  const imgSrc = user.avatarUrl || undefined;
  let avatarProps: AvatarProps = {
    overflow: 'hidden'
  };

  if (scaleOnHover) {
    avatarProps._hover = {
      ...avatarProps._hover,
      transform: 'scale(1.1)'
    };
    avatarProps.transition = 'transform 0.2s ease-in-out';
  }

  avatarProps = {
    ...avatarProps,
    ...props,
    _hover: { ...avatarProps._hover, ...props._hover } // merge hover props properly
  };

  const link = `/user/${user.username}`;

  let avatar: JSX.Element;
  if (redirectToProfile) {
    let linkBoxProps: LinkBoxProps = {};

    if (scaleOnHover) {
      linkBoxProps._hover = {
        '& span.chakra-avatar': {
          transform: 'scale(1.1)'
        }
      };
    }

    avatar = (
      <HStack spacing={3}>
        <LinkBox {...linkBoxProps}>
          <Avatar name={user.username} src={imgSrc} {...avatarProps} />
          <LinkOverlay href={link} />
        </LinkBox>
        {showName && (
          <Link
            href={link}
            {...nameProps}
            _hover={{ color: 'components.userAvatar.username._hover.color' }}
          >
            {user.displayName}
          </Link>
        )}
      </HStack>
    );
  } else {
    avatar = <Avatar src={imgSrc} {...avatarProps} />;
  }

  if (showTooltip) {
    return (
      <Tooltip
        label={<UserPreview user={user} />}
        aria-label={user.username}
        bgColor="transparent"
        boxShadow="lg"
      >
        {avatar}
        {showName && (
          <Link href={link} {...nameProps}>
            {user.displayName}
          </Link>
        )}
      </Tooltip>
    );
  }

  return avatar;
};

export default UserAvatar;
