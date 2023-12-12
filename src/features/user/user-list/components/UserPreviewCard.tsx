import { FC, ReactNode, useMemo, useState } from 'react';
import { TProfileStatType, TUser } from '../../types/user';
import {
  Avatar,
  Box,
  Card,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VStack
} from '@chakra-ui/react';
import { userStatIcons } from '../../../../shared/vars/user';
import { capitalizeWord, formatNumber } from '../../../../shared/utils/utils';
import ProfileFollowButton from '../../profile/components/ProfileFollowButton';
import { useAuthenticationContext } from '@atsnek/jaen';

export const userPreviewCardStyling = {
  card: {
    variant: 'outline',
    p: 5,
    borderRadius: 'xl',
    w: 'full'
  },
  outerHStack: {
    w: 'full',
    spacing: 3,
    alignItems: 'start'
  },
  avatar: {
    borderRadius: 'md',
    boxSize: '48px'
  },
  vstack: {
    alignItems: 'flex-start'
  },
  stats: {
    hstack: {
      w: 'full',
      spacing: 3
    }
  }
};

interface IUserPreviewCardProps {
  user: TUser;
  toggleFollow: (id: string) => Promise<boolean>;
}

/**
 * Component for displaying a preview of a user.
 */
const UserPreviewCard: FC<IUserPreviewCardProps> = ({ user, toggleFollow }) => {
  const [isTogglingFollow, setIsTogglingFollow] = useState(false);
  const isAuthenticated = useAuthenticationContext().user !== null;

  const handleToggleFollow = async () => {
    setIsTogglingFollow(true);
    await toggleFollow(user.id);
    setIsTogglingFollow(false);
  };

  const stats = useMemo(() => {
    const output: ReactNode[] = [];
    if (!user.stats) return output;

    for (const key in {
      followers: user.stats.followers,
      views: user.stats.views,
      experiments: user.stats.experiments
    }) {
      const label = capitalizeWord(key);
      const IconComp = userStatIcons[key as TProfileStatType];
      if (!IconComp) continue;

      const icon = (
        <IconComp
          strokeWidth={2.2}
          h="full"
          color="pages.userProfile.leftNav.socialLinks.icon.color"
        />
      );
      const statValue = (
        <Text
          as="span"
          color="pages.userProfile.leftNav.stats.count.color"
          fontWeight="semibold"
          mr={1}
        >
          {formatNumber(user.stats[key as TProfileStatType])}
        </Text>
      );

      if (key === 'followers') {
        output.push(
          <Box as={HStack} key={key}>
            {icon}
            <LinkBox
              as={HStack}
              spacing={0}
              _hover={{
                '& *': {
                  color: 'pages.userProfile.leftNav.stats.link._hover.color'
                }
              }}
            >
              {statValue}
              <LinkOverlay href={`/user/${user.username}#followers`}>
                {label}
              </LinkOverlay>
            </LinkBox>
          </Box>
        );
      } else {
        output.push(
          <Box as={HStack} key={key}>
            {icon}
            <Text cursor="default">
              {statValue}
              {label}
            </Text>
          </Box>
        );
      }
    }
    return output;
  }, [user]);

  return (
    <LinkBox
      as={Card}
      {...userPreviewCardStyling.card}
      _hover={{
        boxShadow: 'md',
        borderColor: 'theme.500',
        h5: {
          color: 'theme.500'
        }
      }}
      transition="all 0.2s cubic-bezier(.17,.67,.83,.67)"
    >
      <HStack {...userPreviewCardStyling.outerHStack}>
        <Avatar
          name={user.username}
          src={user.avatarUrl}
          {...userPreviewCardStyling.avatar}
        />
        <VStack {...userPreviewCardStyling.vstack}>
          <HStack>
            <Heading as="h5" size="sm" transition="color 0.2s ease-in-out">
              {user.displayName}
            </Heading>
            <LinkOverlay
              href={`/user/${user.username}`}
              fontSize="sm"
              color="gray.500"
            >
              @{user.username}
            </LinkOverlay>
          </HStack>
          <Text fontSize="12px" color="gray.500">
            {user.bio}
          </Text>
          <HStack
            fontSize="12px"
            color="gray.500"
            {...userPreviewCardStyling.stats.hstack}
          >
            {stats}
          </HStack>
        </VStack>
        <Spacer />
        {!user.isOwnProfile && isAuthenticated && (
          <ProfileFollowButton
            isFollowing={user.isFollowing ?? false}
            isLoading={isTogglingFollow}
            toggleFollowState={handleToggleFollow}
            w="fit-content"
            m={0}
          />
        )}
      </HStack>
    </LinkBox>
  );
};

export default UserPreviewCard;
