import { FC, ReactNode, useMemo } from 'react';
import { TProfileStatType, TUser } from '../../types/user';
import {
  Avatar,
  Box,
  Card,
  Grid,
  GridItem,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VStack
} from '@chakra-ui/react';
import { userStatIcons } from '../../../../shared/vars/user';
import { formatNumber } from '../../../../shared/utils/utils';
import ProfileFollowButton from '../../profile/components/ProfileFollowButton';

interface IUserPreviewCardProps {
  user: TUser;
}

/**
 * Component for displaying a preview of a user.
 */
const UserPreviewCard: FC<IUserPreviewCardProps> = ({ user }) => {
  const stats = useMemo(() => {
    const output: ReactNode[] = [];
    if (!user.stats) return output;

    for (const key in {
      followers: user.stats.followers,
      views: user.stats.views,
      posts: user.stats.posts
    }) {
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
              <LinkOverlay href={`/user/${user.username}#followers`}>Followers</LinkOverlay>
            </LinkBox>
          </Box>
        );
      } else {
        output.push(
          <Box as={HStack} key={key}>
            {icon}
            <Text cursor="default">
              {statValue}
              {key}
            </Text>
          </Box>
        );
      }
    }
    return output;
  }, [user]);

  return (
    <LinkBox as={Card} variant="outline" p={5} borderRadius="xl" w="full">
      <HStack w="full" spacing={3} alignItems="start">
        <Avatar name={user.username} src={user.avatarUrl} borderRadius="md" />
        <VStack alignItems="flex-start">
          <HStack>
            <Heading as="h5" size="sm">
              {user.displayName}
            </Heading>
            <LinkOverlay href={`/user/${user.username}`} fontSize="sm" color="gray.500">
              @{user.username}
            </LinkOverlay>
          </HStack>
          <Text fontSize="12px" color="gray.500">
            {user.bio}
          </Text>
          <HStack fontSize="12px" color="gray.500" spacing={3} w="full">
            {stats}
          </HStack>
        </VStack>
        <Spacer />
        {!user.isOwnProfile && (
          <ProfileFollowButton
            isFollowing={user.isFollowing ?? false}
            isLoading={false}
            toggleFollowState={() => {}}
            w="fit-content"
            m={0}
          />
        )}
      </HStack>
    </LinkBox>
  );
};

export default UserPreviewCard;
