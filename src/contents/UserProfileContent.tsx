import { Box, Button, HStack, Stack, useDisclosure } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import MainGrid from '../shared/containers/components/MainGrid';
import LeftNavProfile from '../features/user/profile/components/LeftNavProfile';
import PostList from '../features/post/PostList';
import ProfileOverview from '../features/user/profile/components/ProfileOverview';
import { useLocation } from '@reach/router';
import TbUser from '../shared/components/icons/tabler/TbUser';
import TbBook from '../shared/components/icons/tabler/TbBook';
import { TPostListData } from '../features/post/types/post';
import TopNav from '../shared/containers/navigation/TopNav';
import { SnekUser, useAuthenticationContext } from '@atsnek/jaen';
import {
  TActivitySection,
  TActivityType
} from '../features/user/activity/types/activity';
import { sq } from '@snek-functions/origin';
import { TProfile } from '../features/user/types/user';
import { TLinkData } from '../shared/types/navigation';

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

//TODO: This would be fetched from the API
// const activities: TActivitySection[] = [
//   {
//     timestamp: '2023-07-15',
//     activities: [
//       {
//         id: '1',
//         title: {
//           name: 'Unlocking the Power of Quantum Computing',
//           href: '#'
//         },
//         timestamp: '2023-07-15',
//         type: 'published'
//       },
//       {
//         id: '2',
//         title: {
//           name: 'Unlocking the Power of Quantum Computing',
//           href: '#'
//         },
//         timestamp: '2023-07-15',
//         type: 'commented'
//       },
//       {
//         id: '4',
//         title: {
//           name: 'Learn Quantum Computing with Python and Qiskit',
//           href: '#'
//         },
//         timestamp: '2023-07-10',
//         type: 'published'
//       }
//     ]
//   },
//   {
//     timestamp: '2023-06-22',
//     activities: [
//       {
//         id: '3',
//         title: {
//           name: 'How to PhotonQ',
//           href: '/docs'
//         },
//         timestamp: '2023-06-01',
//         type: 'rated'
//       },
//       {
//         id: '5',
//         title: {
//           name: 'Exploring Quantum Algorithms',
//           href: '#'
//         },
//         timestamp: '2023-07-12',
//         type: 'published'
//       },
//       {
//         id: '6',
//         title: {
//           name: 'Introduction to Quantum Mechanics',
//           href: '#'
//         },
//         timestamp: '2023-07-17',
//         type: 'published'
//       },
//       {
//         id: '7',
//         title: {
//           name: 'Introduction to Quantum Mechanics',
//           href: '#'
//         },
//         timestamp: '2023-07-17',
//         type: 'commented'
//       }
//     ]
//   },
//   {
//     timestamp: '2023-05-30',
//     activities: [
//       {
//         id: '8',
//         title: {
//           name: "Quantum Computing: A Beginner's Guide",
//           href: '#'
//         },
//         timestamp: '2023-07-09',
//         type: 'published'
//       },
//       {
//         id: '9',
//         title: {
//           name: 'Quantum Computing Hardware Overview',
//           href: '#'
//         },
//         timestamp: '2023-07-16',
//         type: 'published'
//       },
//       {
//         id: '10',
//         title: {
//           name: 'Quantum Cryptography: Ensuring Secure Communication',
//           href: '#'
//         },
//         timestamp: '2023-07-15',
//         type: 'published'
//       }
//     ]
//   },
//   {
//     timestamp: '2023-04-20',
//     activities: [
//       {
//         id: '11',
//         title: {
//           name: 'Quantum Machine Learning: Enhancing AI with Qubits',
//           href: '#'
//         },
//         timestamp: '2023-07-14',
//         type: 'published'
//       },
//       {
//         id: '12',
//         title: {
//           name: 'Quantum Error Correction: Protecting Qubits',
//           href: '#'
//         },
//         timestamp: '2023-07-13',
//         type: 'published'
//       },
//       {
//         id: '13',
//         title: {
//           name: 'Quantum Supremacy: Breaking Computational Barriers',
//           href: '#'
//         },
//         timestamp: '2023-07-12',
//         type: 'published'
//       },
//       {
//         id: '14',
//         title: {
//           name: 'Quantum Entanglement: Spooky Action at a Distance',
//           href: '#'
//         },
//         timestamp: '2023-07-11',
//         type: 'published'
//       },
//       {
//         id: '15',
//         title: {
//           name: 'Quantum Algorithms for Optimization Problems',
//           href: '#'
//         },
//         timestamp: '2023-07-10',
//         type: 'published'
//       }
//     ]
//   }
// ];

/**
 * Component for displaying a certain user profile.
 */
const UserProfileContent: FC = () => {
  const { hash } = useLocation();
  const topNavDisclosure = useDisclosure();
  const [posts, setPosts] = useState<TPostListData>({
    state: 'inactive',
    posts: []
  });
  const [activity, setActivity] = useState<TActivitySection[]>();
  const [user, setUser] = useState<SnekUser>();
  const [postFilterQuery, setPostFilterQuery] = useState<string>();
  const [overviewPosts, setOverviewPosts] = useState<TPostListData>({
    state: 'loading',
    posts: []
  });
  const [activeTab, setActiveTab] =
    useState<(typeof tabNavItems)[number]['value']>('posts');

  useEffect(() => {
    fetchProfileData('c2040ccf-e16b-498a-892e-9f1947644dc5').then(data => {
      console.log('data: ', data);
      if (!data) return;
      setPosts({ state: 'success', posts: data.posts });
      setActivity(data.activity);
    });
    // sq.query(q => q.allSocialPostTrending().map(post => post.title)).then(
    //   ([posts, errors]) => {
    //     if (errors) {
    //       console.error(errors);
    //       return;
    //     }
    //     console.log(posts);
    //   }
    // );
  }, []);

  /**
   * Fetches a user from jaen by their id
   * @param id The id of the user to fetch
   * @returns The user with the given id or undefined if no user was found
   */
  const fetchProfileData = async (
    id: string
  ): Promise<TProfile | undefined> => {
    const [profile, error] = await sq.query((q): TProfile => {
      const profile = q.socialProfile({ profileId: id });

      const activitySections: TActivitySection[] = [];

      let currentActivitySection: TActivitySection | null = null;

      profile.activity.forEach(({ createdAt, follow, post, type }) => {
        if (!createdAt) return;

        const date = new Date(createdAt);
        const sectionDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );

        if (
          !currentActivitySection ||
          currentActivitySection.timestamp !== sectionDate.toISOString()
        ) {
          currentActivitySection = {
            timestamp: sectionDate.toISOString(),
            activities: []
          };
          activitySections.push(currentActivitySection);
        }

        let title = '';

        if (type === 'blog_create' && post) {
          title = `Created a blog post \"${post.title.substring(0, 20)}${
            post.title.length > 20 ? '...' : ''
          }\"`;
        } else if (type === 'profile_create') {
          title = `Created a profile`;
        } else if (type === 'follow_follow' && follow) {
          title = `Followed ${
            follow.followed ? follow.followed.userId : 'a user'
          }`;
        }

        currentActivitySection.activities.push({
          type: type as TActivityType,
          timestamp: createdAt,
          title: {
            name: title,
            href: post?.id
          }
        });
      });

      // for (const activity of profile.activity) {
      //   const date = new Date(activity.createdAt);
      //   const sectionDate = new Date(
      //     date.getFullYear(),
      //     date.getMonth(),
      //     date.getDate()
      //   );

      //   if (
      //     !currentActivitySection ||
      //     currentActivitySection.timestamp !== sectionDate.toISOString()
      //   ) {
      //     currentActivitySection = {
      //       timestamp: sectionDate.toISOString(),
      //       activities: []
      //     };
      //     activitySections.push(currentActivitySection);
      //   }

      //   console.log('activity', activity);
      //   currentActivitySection.activities.push({
      //     type: activity.type as TActivityType,
      //     timestamp: activity.createdAt,
      //     title: {
      //       name: activity.post?.title ?? '',
      //       href: activity.post?.id
      //     }
      //   });
      // }

      return {
        userId: profile.userId,
        bio: profile.bio,
        activity: activitySections,
        posts: profile.posts.map(post => ({
          id: post.id,
          title: post.title,
          summary: post.summary,
          stars: post.stars.length,
          avatarUrl: post.avatarURL,
          createdAt: post.createdAt,
          canManage: post.profileId === id
        }))
      };
    });

    if (!profile) return; //TODO: Redirect

    const [user, userError] = await sq.query(q => {
      const user = q.user({ id: profile.userId });
      return {
        username: user.username,
        firstName: user.details.firstName,
        lastName: user.details.lastName
      };
    });

    console.log('user', user);
    if (!user) return; //TODO: Redirect

    const profileData = {
      ...profile,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };

    // setOverviewPosts({ state: 'success', posts: profile.posts });

    console.log(profileData);

    // const user = q.user({ id: profile.userId });
    // return {
    //   username: user.username,
    //   firstName: user.details.firstName,
    //   lastName: user.details.lastName,
    //   bioo: profile.bio
    // };

    if (error) return undefined;
    return profileData;
  };

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
        posts={overviewPosts}
        setPosts={setOverviewPosts}
        activity={activity}
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
        <Box>{/* <LeftNavProfile userData={user} /> */}</Box>
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
