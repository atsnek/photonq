import { sq } from '@/clients/social';
import {
  AuthUserProvider,
  PageConfig,
  PageProps,
  useAuth,
  useAuthUser
} from '@atsnek/jaen';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  Wrap
} from '@chakra-ui/react';
import { useLazyQuery, useQuery } from 'snek-query/react-hooks';
import { FaFlask } from '@react-icons/all-files/fa/FaFlask';
import MainGrid from '../../components/MainGrid';
import { formatNumber } from '../../utils/general';
import TbEye from '../../components/icons/tabler/TbEye';
import TbUserShare from '../../components/icons/tabler/TbUserShare';
import TbUsers from '../../components/icons/tabler/TbUsers';
import PostList from '../../components/post/PostList';
import TbUser from '../../components/icons/tabler/TbUser';
import TbStar from '../../components/icons/tabler/TbStar';
import { SortOrderInput } from '@/clients/social/src/schema.generated';
import { asEnumKey } from 'snek-query';
import PostCard from '../../components/post/PostCard';
import { Link } from 'gatsby-plugin-jaen';
import { useEffect, useRef, useState } from 'react';
import UserCard from '../../components/user/UserCard';
import useNavOffset from '../../hooks/use-nav-offset';

const AvatarImage: React.FC<{
  src: string | undefined;
  displayName: string;
  onClick?: () => void;
}> = ({ src, displayName, onClick }) => {
  return (
    <Image
      src={src}
      fallback={
        <Center>
          <Text>
            {displayName
              .split(' ')
              .map(name => name[0])
              .slice(0, 2)
              .join('')}
          </Text>
        </Center>
      }
      onClick={onClick}
      width={{
        base: '100px',
        md: 'full'
      }}
      objectFit="cover"
      objectPosition="top"
      h="max-content"
      aspectRatio={1}
      _hover={{
        boxShadow: 'rgba(0, 0, 0, 0.2) 6px 12px 28px -5px',
        transform: 'scale(1.02)'
      }}
      borderRadius="full"
      transition="box-shadow 0.2s cubic-bezier(.17,.67,.83,.67), transform 0.2s cubic-bezier(.17,.67,.83,.67)"
    />
  );
};

const EditableImage: React.FC<{
  avatarUrl: string | null;
  displayName: string;
  userId: string;
}> = ({ avatarUrl, userId, displayName }) => {
  const authUser = useAuthUser();

  const imageRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Input
        display="none"
        type="file"
        ref={imageRef}
        onChange={async e => {
          if (userId !== authUser.user.id) {
            return;
          }

          const file = e.target.files?.[0];

          if (file) {
            await authUser.profileAvatarUpdate(file);

            // Reload window
            window.location.reload();
          }
        }}
      />

      <AvatarImage
        src={avatarUrl || undefined}
        displayName={displayName}
        onClick={() => {
          if (userId === authUser.user.id) {
            imageRef.current?.click();
          }
        }}
      />
    </>
  );
};

const Page: React.FC<PageProps> = ({ location, pageContext, params }) => {
  const offset = useNavOffset();

  const userId = params.userId;

  const auth = useAuth();

  const [_, { data, isLoading, refetch }] = useLazyQuery(sq);

  const user = data.user({
    where: {
      id: userId
    }
  });

  const [tabIndex, setTabIndex] = useState(0);

  const handleSliderChange = event => {
    setTabIndex(parseInt(event.target.value, 10));
  };

  const handleTabsChange = index => {
    setTabIndex(index);
  };

  useEffect(() => {
    refetch();

    setTabIndex(0);
  }, [userId]);

  const [isFollow, setIsFollow] = useState(false);

  return (
    <Box minH="100dvh" mt={offset}>
      {isLoading && <div>Loading...</div>}

      <MainGrid>
        <Stack divider={<StackDivider />}>
          {userId === auth.user?.profile.sub ? (
            <AuthUserProvider>
              <EditableImage
                avatarUrl={user.profile.avatarUrl}
                userId={userId}
                displayName={user.profile.displayName}
              />
            </AuthUserProvider>
          ) : (
            <AvatarImage
              src={user.profile.avatarUrl || undefined}
              displayName={user.profile.displayName}
            />
          )}

          <Stack>
            <Heading as="h6" fontSize="24px">
              {user.profile.displayName}
            </Heading>
            <Text>@{user.profile.userName}</Text>

            <Button
              display={userId === auth.user?.profile.sub ? 'none' : 'block'}
              variant="outline"
              isLoading={isFollow}
              onClick={async () => {
                setIsFollow(true);
                const [_, errors] = user.isFollowed
                  ? await sq.mutate(m =>
                      m.userUnfollow({
                        followedId: userId
                      })
                    )
                  : await sq.mutate(m =>
                      m.userFollow({
                        followedId: userId
                      })
                    );

                if (!errors) {
                  refetch();
                }

                setIsFollow(false);
              }}
            >
              {user.isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
          </Stack>

          {user.bio && <Textarea value={user.bio} />}

          <List>
            <ListItem>
              <ListIcon as={TbUsers} />
              <Link
                onClick={() => {
                  handleTabsChange(3);
                }}
              >
                {formatNumber(user.followers().totalCount)} Followers
              </Link>
            </ListItem>
            <ListItem>
              <ListIcon as={TbUserShare} />
              <Link
                onClick={() => {
                  handleTabsChange(4);
                }}
              >
                {formatNumber(user.followings().totalCount)} Following
              </Link>
            </ListItem>

            <ListItem>
              <ListIcon as={TbEye} />
              {formatNumber(user.receivedUserViews().totalCount)} Views
            </ListItem>

            <ListItem>
              <ListIcon as={FaFlask} />
              <Link
                onClick={() => {
                  handleTabsChange(1);
                }}
              >
                {formatNumber(user.posts().totalCount)} Experiments
              </Link>
            </ListItem>
          </List>
        </Stack>

        <Tabs index={tabIndex} onChange={handleTabsChange} isFitted>
          <TabList>
            <Tab>
              <Icon as={TbUser} mr="2" />
              Overview
            </Tab>
            <Tab>
              <Icon as={FaFlask} mr="2" />
              Experiments ({formatNumber(user.posts().totalCount)})
            </Tab>
            <Tab>
              <Icon as={TbStar} mr="2" />
              Stars ({formatNumber(user.starredPosts().totalCount)})
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack spacing="16">
                <SimpleGrid
                  columns={{
                    base: 1,
                    lg: 2
                  }}
                  spacing={4}
                >
                  {user.featuredPosts.nodes.map(post => (
                    <PostCard key={post.id} post={post} hideAuthor />
                  ))}
                </SimpleGrid>

                <Stack spacing="8">
                  <Heading as="h3" size="md">
                    Trending Experiments
                  </Heading>
                  <SimpleGrid
                    columns={{
                      base: 1,
                      lg: 2
                    }}
                    spacing={4}
                  >
                    {data
                      .allTrendingPost({
                        pagination: { first: 4 },
                        where: { userId }
                      })
                      .nodes.map(p => {
                        return <PostCard key={p.id} post={p} hideAuthor />;
                      })}
                  </SimpleGrid>
                </Stack>

                <Stack spacing="8">
                  <Heading as="h3" size="md">
                    Recent Experiments
                  </Heading>
                  <SimpleGrid
                    columns={{
                      base: 1,
                      lg: 2
                    }}
                    spacing={4}
                  >
                    {user
                      .posts({
                        pagination: {
                          first: 4
                        },
                        orderBy: [
                          { createdAt: asEnumKey(SortOrderInput, 'desc') }
                        ]
                      })
                      .nodes.map(post => (
                        <PostCard key={post.id} post={post} hideAuthor />
                      ))}
                  </SimpleGrid>
                </Stack>
              </Stack>
            </TabPanel>

            <TabPanel>
              <Stack verticalAlign="top" direction="row" spacing={4}>
                {user.id && tabIndex === 1 && (
                  <PostList userId={user.id} hideAuthor />
                )}
              </Stack>
            </TabPanel>

            <TabPanel>
              {user.id && tabIndex === 2 && (
                <PostList userId={user.id} useStars />
              )}
            </TabPanel>

            <TabPanel>
              {user.followers().nodes.map(follow => (
                <UserCard
                  key={follow.id}
                  id={follow.follower().id}
                  avatarUrl={follow.follower().profile.avatarUrl}
                  displayName={follow.follower().profile.displayName}
                  userName={follow.follower().profile.userName}
                  stats={{
                    posts: follow.follower().posts().totalCount,
                    followers: follow.follower().followers().totalCount,
                    following: follow.follower().followings().totalCount
                  }}
                />
              ))}

              {user.followers().totalCount === 0 && (
                <Text>No followers yet</Text>
              )}
            </TabPanel>

            <TabPanel>
              {user.followings().nodes.map(follow => (
                <UserCard
                  key={follow.id}
                  id={follow.followed().id}
                  avatarUrl={follow.followed().profile.avatarUrl}
                  displayName={follow.followed().profile.displayName}
                  userName={follow.followed().profile.userName}
                  stats={{
                    posts: follow.followed().posts().totalCount,
                    followers: follow.followed().followers().totalCount,
                    following: follow.followed().followings().totalCount
                  }}
                />
              ))}

              {user.followings().totalCount === 0 && (
                <Text>Not following anyone yet</Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </MainGrid>
    </Box>
  );
};

export default Page;

export const pageConfig: PageConfig = {
  label: 'User',
  icon: 'FaUser',
  breadcrumbs: [
    async () => {
      // get username from url
      let username = window.location.pathname.split('/user/')[1];

      if (!username) return { label: 'User', path: '/user' };

      // Remove trailing slash
      if (username.endsWith('/')) {
        username = username.substring(0, username.length - 1);
      }

      return { label: username, path: `/users/${username}` };
    }
  ],
  menu: {
    type: 'user',
    label: 'Your profile',
    path: ({ auth }) => {
      return `/users/${auth.user?.profile.sub}`;
    }
  }
};
