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
  Portal,
  SimpleGrid,
  SkeletonText,
  Spacer,
  Stack,
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
  Privacy,
  PrivacyInput,
  SortOrderInput
} from '@/clients/social/src/schema.generated';
import { asEnumKey } from 'snek-query';
import PostCard from '../../components/post/PostCard';
import PostLoadError from '../../components/post/PostLoadError';
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
  /**
   * v2's `fallback` prop, by hand.
   *
   * v2's Image ran `useImage` and, with the default `fallbackStrategy`
   * ("beforeLoadOrError"), rendered the `fallback` element INSTEAD of the
   * <img> until the source had loaded — so a user with no `avatarUrl`, which
   * is the common case, saw their initials rather than a broken image. v3's
   * Image is a plain chakra.img: no `fallback`, no `fallbackSrc`, no status.
   * The codemod dropped the prop and the whole fallback element with it, which
   * is why the preloading Image() below is here. It is v2's useImage reduced
   * to the one strategy this call site used.
   */
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);

    if (!src) {
      return;
    }

    // window.Image, because `Image` is Chakra's in this module.
    const image = new window.Image();

    image.onload = () => setIsLoaded(true);
    image.src = src;

    return () => {
      image.onload = null;
    };
  }, [src]);

  if (!isLoaded) {
    return (
      <Center
        onClick={onClick}
        cursor={cursor}
        aspectRatio={1}
        boxSize="full"
        // gray.100 in dark mode was a glaring light disc on the dark page.
        bg={{ base: 'gray.100', _dark: 'gray.700' }}
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
    );
  }

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

/**
 * v2's `line` tab, restated. See the block comment on <Tabs.List> for why.
 *
 * `--indicator-color` rather than a border: v3 paints the underline through a
 * `layerStyle: indicator.bottom` that reads that variable, so setting the
 * variable is what reaches it. brand.600 is the colour v2's `currentColor`
 * border resolved to, because v2 set the label and the border together.
 */
const tabTriggerProps = {
  color: 'inherit',
  _selected: {
    color: 'brand.600',
    '--indicator-color': 'colors.brand.600',
    _dark: { color: 'brand.300', '--indicator-color': 'colors.brand.300' }
  }
} as const;

const Page: React.FC<PageProps> = ({ location, pageContext, params }) => {
  useEffect(() => {
    // add sq to window
    window.sq = sq;
  }, []);

  const offset = useNavOffset();

  const userId = params.userId;

  const auth = useAuth();

  const [_, { data, isLoading, isSafe, refetch, errors, networkError }] =
    useLazyQuery(sq);

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

  // A failed query hands back snek-query's placeholder user, which rendered
  // as "@", zero counts, placeholder cards and "January 2001". Every hook
  // above has run, so returning early is safe, and a retry renders the full
  // page again so that the next request asks for every field.
  if (isSafe && (!!errors?.length || !!networkError)) {
    return (
      <Box minH="100dvh" mt={offset}>
        <PostLoadError subject="This profile" onRetry={refetch} py="24" />
      </Box>
    );
  }

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
              {/* Three props, three traps. v2's `isLoaded` is v3's `loading`,
                  INVERTED — left as `isLoaded` it is not a prop at all and the
                  bar never resolves into text. `noOfLines` stays `noOfLines`:
                  SkeletonText reads it itself, as the number of bars to draw,
                  so the codemod's blanket `lineClamp` rename would have clamped
                  the content instead of counting bars. And `skeletonHeight` is
                  `height`, but only while loading: v3 spreads the remaining
                  props onto the skeleton in both states, where v2's
                  `skeletonHeight` only ever sized the placeholder. */}
              <SkeletonText
                loading={!isSafe}
                noOfLines={1}
                height={isSafe ? undefined : '24px'}
              >
                {/* v2 said `fontSize="24px"` here and got 24px everywhere,
                    because it merged the style prop over the styleConfig before
                    serialising. v3 serialises the recipe first, so the default
                    size's `fontSize: ['3xl', null, '4xl']` leaves behind an
                    `@media (min-width: 48rem)` rule the prop cannot reach and
                    the name would jump to 36px on desktop. `size="h3"` is the
                    theme's flat 24px with the same line-height pair — the size
                    axis is the only place a recipe's responsive value can be
                    replaced rather than fought. */}
                <Heading as="h6" size="h3">
                  {user.profile.displayName}
                </Heading>
              </SkeletonText>

              {/* v2 passed no `skeletonHeight` here, so it took the 0.5rem
                  default; v3 hard-codes 16px per line while loading. The
                  sibling above spells out 24px because v2 did. */}
              <SkeletonText
                loading={!isSafe}
                noOfLines={1}
                height={isSafe ? undefined : '0.5rem'}
              >
                <Text>@{user.profile.userName}</Text>
              </SkeletonText>

              <Spacer />

              {/* The codemod pointed this at `@/components/ui/tooltip`, a CLI
                  snippet this repo does not have and an alias (`@/`) that only
                  resolves `@/clients/*`. Spelled out as the compound component
                  instead, the way the sibling site's Filesystem tooltip is.
                  The two delays are v2's: its Tooltip opened and closed with no
                  delay at all, where zag's defaults are 400ms and 150ms. */}
              <Tooltip.Root
                disabled={auth.isAuthenticated}
                openDelay={0}
                closeDelay={0}
              >
                <Tooltip.Trigger asChild>
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
                </Tooltip.Trigger>

                <Portal>
                  <Tooltip.Positioner>
                    <Tooltip.Content>Sign up to follow users</Tooltip.Content>
                  </Tooltip.Positioner>
                </Portal>
              </Tooltip.Root>
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

          {/* `marginInlineStart="0"` undoes the site list recipe's `1em`. That
              indent belongs to v2's UnorderedList, which the recipe restores
              for the docs; this is a plain v2 <List>, which had none. */}
          <List.Root
            fontSize="sm"
            marginInlineStart="0"
            alignSelf={{
              base: 'center',
              md: 'start'
            }}
          >
            {/* v2's ListIcon was an Icon with exactly three declarations of its
                own: `marginEnd: 0.5rem`, `display: inline` and
                `verticalAlign: text-bottom`. v3's List.Indicator keeps the
                first (marginEnd: 2) and replaces the other two with
                `inline-block` / `middle`, then adds `minHeight: 1lh`, which
                grows every one of these rows by half a line. The three props
                below are v2's values, restated. */}
            <List.Item
              display={{
                base: 'inline-block',
                md: 'block'
              }}
              // The rows sit side by side on a phone and need a gap there.
              // A base of 0 ran them together: "0 Followers0 Following".
              mr={{
                base: 4,
                md: 4
              }}
            >
              <List.Indicator
                asChild
                display="inline"
                verticalAlign="text-bottom"
                minHeight="auto"
              >
                <TbUsers />
              </List.Indicator>
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
              // The rows sit side by side on a phone and need a gap there.
              // A base of 0 ran them together: "0 Followers0 Following".
              mr={{
                base: 4,
                md: 4
              }}
            >
              <List.Indicator
                asChild
                display="inline"
                verticalAlign="text-bottom"
                minHeight="auto"
              >
                <TbUserShare />
              </List.Indicator>
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
              <List.Indicator
                asChild
                display="inline"
                verticalAlign="text-bottom"
                minHeight="auto"
              >
                <TbEye />
              </List.Indicator>
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
              <List.Indicator
                asChild
                display="inline"
                verticalAlign="text-bottom"
                minHeight="auto"
              >
                <FaFlask />
              </List.Indicator>
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

        {/* v3 addresses tabs by string value where v2 addressed them by index.
            The index is what `tabIndex`, `handleTabsChange` and the four
            `handleTabsChange(n)` links above all speak, and two of the panels
            (3 and 4, the follower lists) have no trigger at all and are only
            ever reached through those links, so the position is stringified at
            this boundary and nothing else in the file changes. */}
        <Tabs.Root
          value={String(tabIndex)}
          onValueChange={({ value }) => handleTabsChange(Number(value))}
          fitted
        >
          {/* The icons drop v2's `mr="2"`: v3's trigger is a flex box with
              `gap: 2` of its own, which v2's Tab did not have, so keeping the
              margin would have put a full 1rem between glyph and label. The
              gap is the same 0.5rem the margin was.

              The two props here and `tabTriggerProps` are v2's `line` variant,
              which v3's `line` is not. v2 drew a 2px rule under the whole list
              in `inherit`, gave every tab a 2px transparent bottom border pulled
              up by -2px, left unselected labels at the body colour, and on
              selection set the label to `${c}.600` with the border at
              `currentColor` — so the underline WAS the label's colour. v3 draws
              a 1px rule in `border` grey, dims unselected labels to `fg.muted`,
              blackens the selected one to `fg`, and moves the underline into a
              separate indicator layer coloured `colorPalette.solid` (brand.500).
              Left alone the bar reads grey on grey with a near-black active tab
              instead of photonq's blue. This is the site's only Tabs, so the
              values are restored here rather than in a recipe. */}
          <Tabs.List borderBottomWidth="2px" borderColor="inherit">
            <Tabs.Trigger value="0" fontSize="sm" {...tabTriggerProps}>
              <Icon as={TbUser} />
              Overview
            </Tabs.Trigger>
            <Tabs.Trigger value="1" fontSize="sm" {...tabTriggerProps}>
              <Icon as={FaFlask} />
              Experiments ({formatNumber(user.posts().totalCount)})
            </Tabs.Trigger>
            <Tabs.Trigger value="2" fontSize="sm" {...tabTriggerProps}>
              <Icon as={TbStar} />
              Stars ({formatNumber(user.starredPosts().totalCount)})
            </Tabs.Trigger>
          </Tabs.List>

          {/* `p="4"` per panel is v2's TabPanel base, which was a flat
              `padding: 4`. v3's content pads the top only, so the panels would
              otherwise lose their side and bottom inset. The value is the same
              1rem the recipe puts on top, so the two agree. */}
          <Tabs.ContentGroup mt="12">
            <Tabs.Content value="0" p="4">
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
            </Tabs.Content>

            <Tabs.Content value="1" p="4">
              <Stack verticalAlign="top" direction="row" gap={4}>
                {user.id && tabIndex === 1 && (
                  <PostList userId={user.id} hideAuthor />
                )}
              </Stack>
            </Tabs.Content>

            <Tabs.Content value="2" p="4">
              {user.id && tabIndex === 2 && (
                <PostList userId={user.id} useStars />
              )}
            </Tabs.Content>

            <Tabs.Content value="3" p="4">
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
            </Tabs.Content>

            <Tabs.Content value="4" p="4">
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
            </Tabs.Content>
          </Tabs.ContentGroup>
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
