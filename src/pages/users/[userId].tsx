import { sq } from '@/clients/social';
import {
  AuthUserProvider,
  PageConfig,
  PageProps,
  useAuth,
  useAuthUser
} from 'jaen';
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
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
  SkeletonText,
  Spacer,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  Tooltip,
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
import {
  Activity,
  ActivityType,
  SortOrderInput
} from '@/clients/social/src/schema.generated';
import { asEnumKey } from 'snek-query';
import PostCard from '../../components/post/PostCard';
import { Link } from 'gatsby-plugin-jaen';
import { useEffect, useRef, useState } from 'react';
import UserCard from '../../components/user/UserCard';
import useNavOffset from '../../hooks/use-nav-offset';
import Stepper from '../../components/Stepper';
import TbConfetti from '../../components/icons/tabler/TbConfetti';
import TbInfoCircle from '../../components/icons/tabler/TbInfoCircle';
import TbUserMinus from '../../components/icons/tabler/TbUserMinus';
import TbUserPlus from '../../components/icons/tabler/TbUserPlus';
import TbPencilPlus from '../../components/icons/tabler/TbPencilPlus';
import { TextControl } from '../../components/TextControl';

const AvatarImage: React.FC<{
  src: string | undefined;
  displayName: string;
  cursor?: BoxProps['cursor'];
  onClick?: () => void;
}> = ({ src, displayName, onClick, cursor }) => {
  return (
    <Image
      src={src}
      cursor={cursor}
      fallback={
        <Center
          onClick={onClick}
          cursor={cursor}
          aspectRatio={1}
          boxSize="full"
          bg="gray.100"
          _hover={{
            boxShadow: 'rgba(0, 0, 0, 0.2) 6px 12px 28px -5px',
            transform: 'scale(1.02)'
          }}
          borderRadius="full"
          transition="box-shadow 0.2s cubic-bezier(.17,.67,.83,.67), transform 0.2s cubic-bezier(.17,.67,.83,.67)"
        >
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
      boxSize="full"
      objectFit="cover"
      objectPosition="top"
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
  const auth = useAuth();
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
        cursor={userId === authUser.user.id ? 'pointer' : 'default'}
        onClick={() => {
          if (userId === authUser.user.id) {
            imageRef.current?.click();
          }
        }}
      />
    </>
  );
};

const ActivityList: React.FC<{
  activities: Activity[];
}> = props => {
  type ResolvedActivity = {
    createdAt: string;
    post?: {
      slug: string;
      title: string;
    };
    type: ActivityType;
    relatedUser?: {
      id: string;
      profile: {
        displayName: string;
      };
    };
  };

  const groupByDate = props.activities.reduce<{
    [key: string]: ResolvedActivity[];
  }>((acc, activity) => {
    const date = new Date(activity.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push({
      createdAt: activity.createdAt,
      post: activity.post()
        ? {
            slug: activity.post()!.slug,
            title: activity.post()!.title
          }
        : undefined,
      type: activity.type!,
      relatedUser: activity.relatedUser()
        ? {
            id: activity.relatedUser()!.id,
            profile: {
              displayName: activity.relatedUser()!.profile.displayName
            }
          }
        : undefined
    });

    return acc;
  }, {});

  console.log(groupByDate);

  const [batch, setBatch] = useState(0);

  const generateDetails = (
    activity: ResolvedActivity
  ): {
    title: string;
    icon: React.ReactNode;
    to?: string;
  } => {
    const post = activity.post;
    const relatedUser = activity.relatedUser;

    switch (activity.type) {
      case ActivityType.USER_CREATED:
        return {
          title: 'Joined the community',
          icon: <TbConfetti />
        };
      case ActivityType.POST_CREATED:
        if (post) {
          return {
            title: `Created a new experiment: "${post.title}"`,
            icon: <TbPencilPlus />,
            to: `/experiments/${post.slug}`
          };
        }

        return {
          title: 'Created a new private experiment',
          icon: <TbPencilPlus />
        };
      case ActivityType.STAR:
        if (post) {
          return {
            title: `Starred an experiment: "${post.title}"`,
            icon: <TbStar />,
            to: `/experiments/${post.slug}`
          };
        }

        return {
          title: 'Starred an private experiment',
          icon: <TbStar />
        };
      case ActivityType.UNSTAR:
        const postTitleUnstar = activity.post?.title;

        if (post) {
          return {
            title: `Unstarred an experiment: "${postTitleUnstar}"`,
            icon: <TbStar />,
            to: `/experiments/${post.slug}`
          };
        }

        return {
          title: 'Unstarred an private experiment',
          icon: <TbStar />
        };
      case ActivityType.FOLLOW:
        if (relatedUser) {
          return {
            title: `Followed ${relatedUser.profile.displayName}`,
            icon: <TbUserPlus />,
            to: `/users/${relatedUser.id}`
          };
        }

        return {
          title: 'Followed an unknown user',
          icon: <TbUserPlus />
        };
      case ActivityType.UNFOLLOW:
        if (relatedUser) {
          return {
            title: `Unfollowed ${relatedUser.profile.displayName}`,
            icon: <TbUserMinus />,
            to: `/users/${relatedUser.id}`
          };
        }

        return {
          title: 'Unfollowed an unknown user',
          icon: <TbUserMinus />
        };

      default:
        return {
          title: 'Unknown activity',
          icon: <TbInfoCircle />
        };
    }
  };

  return (
    <Stepper
      sections={Object.keys(groupByDate).map(key => {
        return {
          title: new Date(key).toLocaleDateString('default', {
            month: 'long',
            year: 'numeric'
          }),
          items: groupByDate[key].map(activity => {
            const details = generateDetails(activity);

            return {
              title: details.title,
              icon: details.icon,
              to: details.to
            };
          })
        };
      })}
    />
  );
};

const Page: React.FC<PageProps> = ({ location, pageContext, params }) => {
  const offset = useNavOffset();

  const userId = params.userId;

  const auth = useAuth();

  const [_, { data, isLoading, isSafe, refetch }] = useLazyQuery(sq);

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
      <MainGrid>
        <Stack mt="16">
          <Box alignSelf="center">
            <Flex justifyContent="center" boxSize={250} mt="4">
              {userId === auth.user?.profile?.sub ? (
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
            </Flex>

            <Stack
              mt="4"
              mb="4"
              textAlign={{
                base: 'center',
                md: 'start'
              }}
              justifyContent={{
                base: 'center',
                md: 'start'
              }}
            >
              <SkeletonText
                isLoaded={isSafe}
                noOfLines={1}
                skeletonHeight={'24px'}
              >
                <Heading as="h6" fontSize="24px">
                  {user.profile.displayName}
                </Heading>
              </SkeletonText>

              <SkeletonText isLoaded={isSafe} noOfLines={1}>
                <Text>@{user.profile.userName}</Text>
              </SkeletonText>

              <Spacer />

              <Tooltip
                label="Sign up to follow users"
                isDisabled={auth.isAuthenticated}
              >
                <Button
                  display={
                    !isSafe || userId === auth.user?.profile?.sub
                      ? 'none'
                      : 'block'
                  }
                  variant="outline"
                  isLoading={isFollow}
                  onClick={async () => {
                    if (!auth.isAuthenticated) {
                      auth.signinRedirect({
                        prompt: 'create'
                      });
                      return;
                    }

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
              </Tooltip>
            </Stack>

            <TextControl
              text={user.bio || 'No bio yet'}
              type="text"
              editable={userId === auth.user?.profile?.sub}
              onSubmit={async bio => {
                await sq.mutate(m =>
                  m.userUpdate({
                    id: userId,
                    values: {
                      bio
                    }
                  })
                );
              }}
            />
          </Box>

          <List
            fontSize="sm"
            alignSelf={{
              base: 'center',
              md: 'start'
            }}
          >
            <ListItem
              display={{
                base: 'inline-block',
                md: 'block'
              }}
              mr={{
                base: 0,
                md: 4
              }}
            >
              <ListIcon as={TbUsers} />
              <Link
                onClick={() => {
                  handleTabsChange(3);
                }}
              >
                <b>{formatNumber(user.followers().totalCount)}</b> Followers
              </Link>
            </ListItem>
            <ListItem
              display={{
                base: 'inline-block',
                md: 'block'
              }}
              mr={{
                base: 0,
                md: 4
              }}
            >
              <ListIcon as={TbUserShare} />
              <Link
                onClick={() => {
                  handleTabsChange(4);
                }}
              >
                <b>{formatNumber(user.followings().totalCount)} </b>Following
              </Link>
            </ListItem>

            <ListItem
              display={{
                base: 'inline-block',
                md: 'block'
              }}
              mr={{
                base: 4,
                md: 0
              }}
            >
              <ListIcon as={TbEye} />
              <b>{formatNumber(user.receivedUserViews().totalCount)}</b> Views
            </ListItem>

            <ListItem
              display={{
                base: 'inline-block',
                md: 'block'
              }}
              mr={{
                base: 0,
                md: 4
              }}
            >
              <ListIcon as={FaFlask} />
              <Link
                onClick={() => {
                  handleTabsChange(1);
                }}
              >
                <b>{formatNumber(user.posts().totalCount)}</b> Experiments
              </Link>
            </ListItem>
          </List>
        </Stack>

        <Tabs index={tabIndex} onChange={handleTabsChange} isFitted>
          <TabList>
            <Tab fontSize="sm">
              <Icon as={TbUser} mr="2" />
              Overview
            </Tab>
            <Tab fontSize="sm">
              <Icon as={FaFlask} mr="2" />
              Experiments ({formatNumber(user.posts().totalCount)})
            </Tab>
            <Tab fontSize="sm">
              <Icon as={TbStar} mr="2" />
              Stars ({formatNumber(user.starredPosts().totalCount)})
            </Tab>
          </TabList>

          <TabPanels mt="12">
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
                    <PostCard
                      key={post.id}
                      post={post}
                      hideAuthor
                      isSafe={isSafe}
                    />
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
                        return (
                          <PostCard
                            key={p.id}
                            post={p}
                            hideAuthor
                            isSafe={isSafe}
                          />
                        );
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
                        <PostCard
                          key={post.id}
                          post={post}
                          hideAuthor
                          isSafe={isSafe}
                        />
                      ))}
                  </SimpleGrid>
                </Stack>

                <Stack spacing="8">
                  <Heading size="md">Activity</Heading>

                  <ActivityList
                    activities={
                      user.activities({
                        orderBy: [
                          { createdAt: asEnumKey(SortOrderInput, 'desc') }
                        ]
                      }).nodes
                    }
                  />
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
              <Stack spacing={4}>
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
              </Stack>

              {user.followers().totalCount === 0 && (
                <Text>No followers yet</Text>
              )}
            </TabPanel>

            <TabPanel>
              <Stack spacing={4}></Stack>
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
      return `/users/${auth.user?.profile?.sub}`;
    }
  }
};
