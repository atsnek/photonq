import { Box, Button, HStack, Stack, useDisclosure } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import MainGrid from '../shared/containers/components/MainGrid';
import LeftNavProfile from '../features/user/profile/components/LeftNavProfile';
import PostList from '../features/post/PostList';
import ProfileOverview from '../features/user/profile/components/ProfileOverview';
import { useLocation } from '@reach/router';
import TbUser from '../shared/components/icons/tabler/TbUser';
import TbBook from '../shared/components/icons/tabler/TbBook';
import { TPostListData, TPostPrivacy } from '../features/post/types/post';
import TopNav from '../shared/containers/navigation/TopNav';
import { SnekUser, useAuthenticationContext } from '@atsnek/jaen';
import {
  TActivitySection,
  TActivityType
} from '../features/user/activity/types/activity';
import { sq } from '@snek-functions/origin';
import { TProfile } from '../features/user/types/user';
import { TLinkData } from '../shared/types/navigation';
import { Post } from '@snek-functions/origin/dist/schema.generated';
import useAuth from '../shared/hooks/use-auth';
import { useAppSelector } from '@atsnek/jaen/dist/redux';
import { useAppStore } from '../shared/store/store';

const tabNavItems = [
  {
    label: 'Overview',
    value: 'overview',
    icon: <TbUser />
  },
  {
    label: 'Posts',
    value: 'posts',
    icon: <TbBook />
  }
] as const;

interface IUserProfileContent {
  profileId: string;
}

/**
 * Component for displaying a certain user profile.
 */
const UserProfileContent: FC<IUserProfileContent> = ({ profileId }) => {
  const { hash } = useLocation();
  const topNavDisclosure = useDisclosure();
  const [posts, setPosts] = useState<TPostListData>({
    state: 'inactive',
    posts: []
  });
  // const [profile, setProfile] = useSta;
  const fetchProfile = useAppStore(state => state.fetchProfile);
  const [postFilterQuery, setPostFilterQuery] = useState<string>();
  const [activeTab, setActiveTab] =
    useState<(typeof tabNavItems)[number]['value']>('posts');
  const isAuthenticated = useAuth();

  useEffect(() => {
    console.log('fetching data for profile', profileId);
    // 'c2040ccf-e16b-498a-892e-9f1947644dc5'

    // fetchProfileData(profileId).then(data => {
    //   console.log('data: ', data);
    //   if (!data) return;
    //   setOverviewPosts({ state: 'success', posts: data.posts });
    //   setActivity(data.activity);
    // });
    // sq.query(q => q.allSocialPostTrending().map(post => post.title)).then(
    //   ([posts, errors]) => {
    //     if (errors) {
    //       console.error(errors);
    //       return;
    //     }
    //     console.log(posts);
    //   }
    // );
    fetchProfile('jan');
  }, []);

  /**
   * Fetches a user from jaen by their id
   * @param id The id of the user to fetch
   * @returns The user with the given id or undefined if no user was found
   */
  // const fetchProfileData = async (
  //   id: string
  // ): Promise<TProfile | undefined> => {
  //   const [profile, error] = await sq.query((q): TProfile => {
  //     const profile = q.socialProfile({ profileId: id });
  //     const { id: currentUserId } = isAuthenticated
  //       ? q.userMe
  //       : { id: undefined };

  //     const activitySections: TActivitySection[] = [];

  //     let currentActivitySection: TActivitySection | null = null;

  //     profile.activity.forEach(({ createdAt, follow, post, type }) => {
  //       if (!createdAt) return;

  //       const date = new Date(createdAt);
  //       const sectionDate = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate()
  //       );

  //       if (
  //         !currentActivitySection ||
  //         currentActivitySection.timestamp !== sectionDate.toISOString()
  //       ) {
  //         currentActivitySection = {
  //           timestamp: sectionDate.toISOString(),
  //           activities: []
  //         };
  //         activitySections.push(currentActivitySection);
  //       }

  //       let title = '';
  //       let href = '';

  //       if (type === 'blog_create' && post) {
  //         title = `Created a blog post \"${post.title.substring(0, 20)}${
  //           post.title.length > 20 ? '...' : ''
  //         }\"`;
  //         href = '/docs/' + post.id;
  //       } else if (type === 'profile_create') {
  //         title = `Created a profile`;
  //         href = '#';
  //       } else if (type === 'follow_follow' && follow) {
  //         title = `Followed ${
  //           follow.followed ? follow.followed.userId : 'a user'
  //         }`;
  //         href = '/profile/' + follow.followed?.userId;
  //       }

  //       currentActivitySection.activities.push({
  //         type: type as TActivityType,
  //         timestamp: createdAt,
  //         title: {
  //           name: title,
  //           href
  //         }
  //       });
  //     });

  //     return {
  //       userId: profile.userId,
  //       bio: profile.bio,
  //       activity: activitySections,
  //       posts: profile.posts
  //         .filter(
  //           ({ privacy }) =>
  //             privacy === 'public' ||
  //             (currentUserId && profile.userId === currentUserId)
  //         )
  //         .map(post => {
  //           const date = new Date(post.createdAt);
  //           return {
  //             id: post.id,
  //             title: post.title,
  //             summary: post.summary,
  //             stars: post.stars.length,
  //             avatarUrl: post.avatarURL,
  //             createdAt: `
  //               ${date.getFullYear()}-
  //               ${date.getMonth().toString().padStart(2, '0')}-
  //               ${date.getDate().toString().padStart(2, '0')}
  //             `,
  //             canManage: post.profile?.userId === currentUserId,
  //             privacy: post.privacy as TPostPrivacy,
  //             profileId: post.profileId
  //           };
  //         })
  //     };
  //   });

  //   if (!profile) return; //TODO: Redirect

  //   const [user, userError] = await sq.query(q => {
  //     const user = q.user({ id: profile.userId });
  //     return {
  //       username: user.username,
  //       firstName: user.details.firstName,
  //       lastName: user.details.lastName
  //     };
  //   });

  //   if (!user) return; //TODO: Redirect

  //   const profileData = {
  //     ...profile,
  //     username: user.username,
  //     firstName: user.firstName,
  //     lastName: user.lastName
  //   };

  //   // setOverviewPosts({ state: 'success', posts: profile.posts });

  //   // const user = q.user({ id: profile.userId });
  //   // return {
  //   //   username: user.username,
  //   //   firstName: user.details.firstName,
  //   //   lastName: user.details.lastName,
  //   //   bioo: profile.bio
  //   // };

  //   if (error) return undefined;
  //   return profileData;
  // };

  const tabNavButtons = useMemo(
    () =>
      tabNavItems.map(item => {
        const isActive = item.value === activeTab;
        return (
          <Button
            key={item.value}
            variant="ghost-hover-opacity"
            size="sm"
            borderRadius="none"
            borderBottom="2px solid"
            borderColor="transparent"
            leftIcon={item.icon}
            {...(isActive && {
              opacity: 1,
              color: 'topNav.tabs.active.color',
              borderBottom: '2px solid',
              borderBottomColor: 'pages.userProfile.topNav.tabs.borderColor'
            })}
            onClick={
              !isActive
                ? () => {
                    //TODO: Add a way to change the URL hash without reloading the page
                    setActiveTab(item.value);
                  }
                : undefined
            }
          >
            {item.label}
          </Button>
        );
      }),
    [tabNavItems, activeTab]
  );

  let mainContent: ReactNode;
  if (activeTab === 'overview') {
    mainContent = (
      <ProfileOverview
        isOwnProfile={false}
        // posts={overviewPosts}
        // setPosts={setOverviewPosts}
      />
    );
  } else {
    mainContent = (
      <PostList
        setPosts={setPosts}
        postData={posts}
        previewType="list"
        defaultFilterQuery={postFilterQuery}
        setFilterQuery={setPostFilterQuery}
        hidePostAuthor
        showControls
      />
    );
  }

  useEffect(() => {
    setActiveTab(hash === '#posts' ? 'posts' : 'overview');
  }, []);

  //! Sticky doesnt work
  //TODO: Fix hydration issue
  return (
    <>
      <HStack justifyContent="center" p={3} position="sticky">
        {tabNavButtons}
      </HStack>
      <MainGrid mt={10}>
        <Box>
          <LeftNavProfile />
        </Box>
        <Stack
          verticalAlign="top"
          spacing={{ base: 0, xl: 12 }}
          direction="row"
        >
          <Box w="full">{mainContent}</Box>
        </Stack>
      </MainGrid>
    </>
  );
};

export default UserProfileContent;
