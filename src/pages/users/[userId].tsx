import { sq } from '@/clients/social';
import {
  AuthUserProvider,
  PageConfig,
  PageProps,
  useAuth,
  useAuthUser
} from 'jaen';
import {
  Steps,
  Avatar,
  Box,
  BoxProps,
  Button,
  Card,
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
  SimpleGrid,
  SkeletonText,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  Wrap,
} from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
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
  Privacy,
  PrivacyInput,
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
      transition="box-shadow 0.2s cubic-bezier(.17,.67,.83,.67), transform 0.2s cubic-bezier(.17,.67,.83,.67)" />
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
        onValueChange={async e => {
          if (userId !== authUser.user.id) {
            return;
          }

          const file = e.target.files?.[0];

          if (file) {
            await authUser.profileAvatarUpdate(file);

            // // Reload window
            // window.location.reload();
          }
        }}
      />
      <AvatarImage
        src={authUser.user?.human?.profile?.avatarUrl || avatarUrl || undefined}
        displayName={displayName}
        cursor={userId === authUser.user?.id ? 'pointer' : 'default'}
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
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Convert month to 1-indexed and pad with leading zero if needed.
    const key = `${year}-${month}-01`;

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
  useEffect(() => {
    // add sq to window
    window.sq = sq;
  }, []);

  const offset = useNavOffset();

  const userId = params.userId;

  const auth = useAuth();

  const [_, { data, isLoading, isSafe, refetch }] = useLazyQuery(sq);

  const user = data.user({
    where: {
      id: userId
    }
  });

  useEffect(() => {
    document.title = `${user.profile.displayName} (@${user.profile.userName})`;
  }, [user]);

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

  const handlePostDelete = async (id: string) => {
    await sq.mutate(m => m.postDelete({ id }));

    refetch();
  };

  const handlePostPrivacy = async (id: string, privacy: Privacy) => {
    await sq.mutate(m =>
      m.postUpdate({
        id,
        values: { privacy: asEnumKey(PrivacyInput, privacy) }
      })
    );

    refetch();
  };

  return (
    <Box minH="100dvh" mt={offset}>
      <MainGrid>
        <Stack mt="16">
          <Box alignSelf="center">
            <Flex justifyContent="center" boxSize={250} mt="4">
              {userId === auth.user?.profile?.sub ? (
                <EditableImage
                  avatarUrl={user.profile.avatarUrl}
                  userId={userId}
                  displayName={user.profile.displayName}
                />
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
                lineClamp={1}
                skeletonHeight={'24px'}
              >
                <Heading as="h6" fontSize="24px">
                  {user.profile.displayName}
                </Heading>
              </SkeletonText>

              <SkeletonText isLoaded={isSafe} lineClamp={1}>
                <Text>@{user.profile.userName}</Text>
              </SkeletonText>

              <Spacer />

              <Tooltip
                content="Sign up to follow users"
                disabled={auth.isAuthenticated}
              >
                <Button
                  display={
                    !isSafe || userId === auth.user?.profile?.sub
                      ? 'none'
                      : 'block'
                  }
                  variant="outline"
                  loading={isFollow}
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

          <List.Root
            fontSize="sm"
            alignSelf={{
              base: 'center',
              md: 'start'
            }}
          >
            <List.Item
              display={{
                base: 'inline-block',
                md: 'block'
              }}
              mr={{
                base: 0,
                md: 4
              }}
            >
              <List.Indicator asChild><TbUsers /></List.Indicator>
              <Link
                onClick={() => {
                  handleTabsChange(3);
                }}
              >
                <b>{formatNumber(user.followers().totalCount)}</b> Followers
              </Link>
            </List.Item>
            <List.Item
              display={{
                base: 'inline-block',
                md: 'block'
              }}
              mr={{
                base: 0,
                md: 4
              }}
            >
              <List.Indicator asChild><TbUserShare /></List.Indicator>
              <Link
                onClick={() => {
                  handleTabsChange(4);
                }}
              >
                <b>{formatNumber(user.followings().totalCount)} </b>Following
              </Link>
            </List.Item>

            <List.Item
              display={{
                base: 'inline-block',
                md: 'block'
              }}
              mr={{
                base: 4,
                md: 0
              }}
            >
              <List.Indicator asChild><TbEye /></List.Indicator>
              <b>{formatNumber(user.receivedUserViews().totalCount)}</b> Views
            </List.Item>

            <List.Item
              display={{
                base: 'inline-block',
                md: 'block'
              }}
              mr={{
                base: 0,
                md: 4
              }}
            >
              <List.Indicator asChild><FaFlask /></List.Indicator>
              <Link
                onClick={() => {
                  handleTabsChange(1);
                }}
              >
                <b>{formatNumber(user.posts().totalCount)}</b> Experiments
              </Link>
            </List.Item>
          </List.Root>
        </Stack>

        <Tabs.Root value={tabIndex} onValueChange={handleTabsChange} fitted>
          <Tabs.List>
            <Tab fontSize="sm">
              <Icon mr="2" asChild><TbUser /></Icon>
              Overview
            </Tab>
            <Tab fontSize="sm">
              <Icon mr="2" asChild><FaFlask /></Icon>
              Experiments ({formatNumber(user.posts().totalCount)})
            </Tab>
            <Tab fontSize="sm">
              <Icon mr="2" asChild><TbStar /></Icon>
              Stars ({formatNumber(user.starredPosts().totalCount)})
            </Tab>
          </Tabs.List>

          <TabPanels mt="12">
            <TabPanel>
              <Stack gap="16">
                <SimpleGrid
                  columns={{
                    base: 1,
                    lg: 2
                  }}
                  gap={4}
                >
                  {user.featuredPosts.nodes.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      hideAuthor
                      isSafe={isSafe}
                      onDelete={handlePostDelete}
                      onSetPrivacy={handlePostPrivacy}
                    />
                  ))}
                </SimpleGrid>

                <Stack gap="8">
                  <Heading as="h3" size="md">
                    Trending Experiments
                  </Heading>
                  <SimpleGrid
                    columns={{
                      base: 1,
                      lg: 2
                    }}
                    gap={4}
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
                            onDelete={handlePostDelete}
                            onSetPrivacy={handlePostPrivacy}
                          />
                        );
                      })}
                  </SimpleGrid>
                </Stack>

                <Stack gap="8">
                  <Heading as="h3" size="md">
                    Recent Experiments
                  </Heading>
                  <SimpleGrid
                    columns={{
                      base: 1,
                      lg: 2
                    }}
                    gap={4}
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

                <Stack gap="8">
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
              <Stack verticalAlign="top" direction="row" gap={4}>
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
              <Stack gap={4}>
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
              <Stack gap={4}></Stack>
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
        </Tabs.Root>
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
      let userId = window.location.pathname.split('/users/')[1];

      userId = userId.split('/')[0];

      const [userName] = await window.sq.query(
        q => q.user({ where: { id: userId } }).profile.userName
      );

      return { label: userName, path: `/users/${userId}/` };
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

export { Head } from 'jaen';
