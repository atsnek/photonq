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
import { TUser } from '../features/user/types/user';

const userData: TUser = {
  displayName: 'Emily Brooks',
  username: 'emilybrooks',
  location: 'San Francisco, CA',
  // company: 'Snek',
  avatarUrl:
    'https://onedrive.live.com/embed?resid=AE2DDC816CEF3E1E%21220972&authkey=%21AIUh8CadUcYw3cg&width=999999&height=1024',
  bio: "Adventurous spirit with a knack for words and a passion for knowledge. Exploring the world of academia, one document at a time. Forever curious, forever learning. Let's dive into the realm of information together uncover the wonders of education.",
  socials: [
    {
      type: 'company',
      label: 'Snek',
      url: 'https://snek.at'
    },
    {
      type: 'email',
      label: 'emily.brooks@snek.at',
      url: 'mailto:emily.brooks@snek.at'
    },
    {
      type: 'linkedin',
      label: 'Emily-Brooks',
      url: 'https://www.linkedin.com/in/emily-brooks-1a2b3c4d/'
    },
    {
      type: 'location',
      label: 'San Francisco, CA'
    }
  ]
};

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
  const [user, setUser] = useState<TUser>();
  const [postFilterQuery, setPostFilterQuery] = useState<string>();
  const [overviewPosts, setOverviewPosts] = useState<TPostListData>({
    state: 'loading',
    posts: []
  });
  const [activeTab, setActiveTab] =
    useState<(typeof tabNavItems)[number]['value']>('posts');

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
      <ProfileOverview posts={overviewPosts} setPosts={setOverviewPosts} />
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

    // Simulate loading the user data
    setTimeout(() => {
      setUser(userData);
    }, 1000);
  }, []);

  return (
    <>
      <TopNav
        drawerDisclosure={topNavDisclosure}
        wrapperProps={{ h: 'max-content', spacing: 5, pb: 0, pt: 3 }}
      >
        <HStack>{tabNavButtons}</HStack>
      </TopNav>
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
