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
import { useAuthenticationContext } from '@atsnek/jaen';
import { TActivitySection } from '../features/user/activity/types/activity';

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
const activities: TActivitySection[] = [
  {
    timestamp: '2023-07-15',
    activities: [
      {
        id: '1',
        title: {
          name: 'Unlocking the Power of Quantum Computing',
          href: '#'
        },
        timestamp: '2023-07-15',
        type: 'published'
      },
      {
        id: '2',
        title: {
          name: 'Unlocking the Power of Quantum Computing',
          href: '#'
        },
        timestamp: '2023-07-15',
        type: 'commented'
      },
      {
        id: '4',
        title: {
          name: 'Learn Quantum Computing with Python and Qiskit',
          href: '#'
        },
        timestamp: '2023-07-10',
        type: 'published'
      }
    ]
  },
  {
    timestamp: '2023-06-22',
    activities: [
      {
        id: '3',
        title: {
          name: 'How to PhotonQ',
          href: '/docs'
        },
        timestamp: '2023-06-01',
        type: 'rated'
      },
      {
        id: '5',
        title: {
          name: 'Exploring Quantum Algorithms',
          href: '#'
        },
        timestamp: '2023-07-12',
        type: 'published'
      },
      {
        id: '6',
        title: {
          name: 'Introduction to Quantum Mechanics',
          href: '#'
        },
        timestamp: '2023-07-17',
        type: 'published'
      },
      {
        id: '7',
        title: {
          name: 'Introduction to Quantum Mechanics',
          href: '#'
        },
        timestamp: '2023-07-17',
        type: 'commented'
      }
    ]
  },
  {
    timestamp: '2023-05-30',
    activities: [
      {
        id: '8',
        title: {
          name: "Quantum Computing: A Beginner's Guide",
          href: '#'
        },
        timestamp: '2023-07-09',
        type: 'published'
      },
      {
        id: '9',
        title: {
          name: 'Quantum Computing Hardware Overview',
          href: '#'
        },
        timestamp: '2023-07-16',
        type: 'published'
      },
      {
        id: '10',
        title: {
          name: 'Quantum Cryptography: Ensuring Secure Communication',
          href: '#'
        },
        timestamp: '2023-07-15',
        type: 'published'
      }
    ]
  },
  {
    timestamp: '2023-04-20',
    activities: [
      {
        id: '11',
        title: {
          name: 'Quantum Machine Learning: Enhancing AI with Qubits',
          href: '#'
        },
        timestamp: '2023-07-14',
        type: 'published'
      },
      {
        id: '12',
        title: {
          name: 'Quantum Error Correction: Protecting Qubits',
          href: '#'
        },
        timestamp: '2023-07-13',
        type: 'published'
      },
      {
        id: '13',
        title: {
          name: 'Quantum Supremacy: Breaking Computational Barriers',
          href: '#'
        },
        timestamp: '2023-07-12',
        type: 'published'
      },
      {
        id: '14',
        title: {
          name: 'Quantum Entanglement: Spooky Action at a Distance',
          href: '#'
        },
        timestamp: '2023-07-11',
        type: 'published'
      },
      {
        id: '15',
        title: {
          name: 'Quantum Algorithms for Optimization Problems',
          href: '#'
        },
        timestamp: '2023-07-10',
        type: 'published'
      }
    ]
  }
];

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
  const { user } = useAuthenticationContext();
  const [postFilterQuery, setPostFilterQuery] = useState<string>();
  const [overviewPosts, setOverviewPosts] = useState<TPostListData>({
    state: 'loading',
    posts: []
  });
  const [activeTab, setActiveTab] =
    useState<(typeof tabNavItems)[number]['value']>('posts');

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

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setActivity(activities);
    }, 2000);
  }, []);

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
        <Box>
          <LeftNavProfile userData={user} />
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
