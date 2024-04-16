import { FC, Fragment, useState } from 'react';
import {
  AvatarProps,
  Box,
  HStack,
  Text,
  TextProps,
  Tooltip,
  TooltipProps
} from '@chakra-ui/react';
import UserAvatar from './UserAvatar';
import Link from '../../../../shared/components/Link';
import { SnekUser } from '@atsnek/jaen';
import { getUserDisplayname } from '../../utils/user';
import { TUser } from '../../types/user';

interface IUserPreviewProps extends TextProps {
  user: TUser;
  showTooltip?: boolean;
  showAvatar?: boolean;
  avatarOnly?: boolean;
  tooltipProps?: TooltipProps;
  showDisplayName?: boolean;
  avatarProps?: AvatarProps;
}

/**
 * Component for displaying a preview of a user.
 */
const UserPreview: FC<IUserPreviewProps> = ({
  user,
  showTooltip = true,
  showAvatar,
  avatarOnly,
  avatarProps,
  tooltipProps,
  showDisplayName,
  ...props
}) => {
  // const [viewState, setViewState] = useState<'minimized' | 'extended'>(
  //   'minimized'
  // );
  // const displayName = getUserDisplayname(user);
  const preview = (
    <HStack
      gridTemplateColumns="1fr auto"
      p={2}
      color="shared.text.default"
      gap={2}
    >
      {<UserAvatar user={user} borderRadius="md" {...avatarProps} />}

      <Box>
        <Text fontSize="md" color="theme.500">
          {user.displayName}
        </Text>
        <Text size="sm" color="gray.500">
          @{user.username}
        </Text>
      </Box>
    </HStack>
  );

  if (avatarOnly) {
    return <></>;
  }

  // const isViewStateExtended = viewState === 'extended';
  // return (
  //   <HStack
  //     position="relative"
  //     gridTemplateColumns="1fr auto"
  //     p={2}
  //     color="shared.text.default"
  //     gap={2}
  //     onMouseEnter={() => setViewState('extended')}
  //     onMouseLeave={() => setViewState('minimized')}
  //   >
  //     <UserAvatar
  //       user={user}
  //       borderRadius="md"
  //       size="md"
  //       {...(!isViewStateExtended && { vsibility: 'hidden', opacity: 0 })}
  //     />

  //     <Box>
  //       <Text
  //         position="absolute"
  //         fontSize="md"
  //         color="theme.500"
  //         {...(!isViewStateExtended && { visibility: 'hidden', opacity: 0 })}
  //       >
  //         {user.displayName}
  //       </Text>
  //       <Text size="sm" color="gray.500">
  //         @{user.username}
  //       </Text>
  //     </Box>
  //   </HStack>
  // );

  const Wrapper = showTooltip ? Tooltip : Fragment;
  let wrapperProps: TooltipProps | {} = {};

  if (showTooltip) {
    wrapperProps = {
      label: preview,
      ariaLabel: user.displayName,
      bgColor: 'shared.body.bgColor',
      boxShadow: 'lg',
      ...tooltipProps
    };
  }

  return (
    <Wrapper
      {...wrapperProps}
      // label={preview}
      // aria-label={user.displayName}
      // bgColor="shared.body.bgColor"
      // boxShadow="lg"
      // {...tooltipProps}
    >
      <Text size="sm" color="gray.500" {...props}>
        {showAvatar && (
          <UserAvatar
            user={user}
            borderRadius="full"
            boxSize="16px"
            verticalAlign="middle"
            mr={1}
            {...avatarProps}
          />
        )}
        {showDisplayName ? user.displayName : `@${user.username}`}
      </Text>
    </Wrapper>
  );

  return preview;
};

export default UserPreview;
