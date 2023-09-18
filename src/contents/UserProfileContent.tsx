import { Box, Button, HStack, Stack } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import MainGrid from '../shared/containers/components/MainGrid';
import LeftNavProfile from '../features/user/profile/components/LeftNavProfile';
import PostList from '../features/post/PostList';
import ProfileOverview from '../features/user/profile/components/ProfileOverview';
import { navigate, useLocation } from '@reach/router';
import TbUser from '../shared/components/icons/tabler/TbUser';
import TbBook from '../shared/components/icons/tabler/TbBook';
import { useAuthenticationContext } from '@atsnek/jaen';
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
  username: string;
}

/**
 * Component for displaying a certain user profile.
 */
const UserProfileContent: FC<IUserProfileContent> = ({ username }) => {
  const SEARCH_LIMIT = 1; //TODO: Change to 10

  const { hash } = useLocation();

  const profile = useAppStore(state => state.profile.profile);
  const fetchProfile = useAppStore(state => state.profile.fetchProfile);
  const fetchOverviewPosts = useAppStore(
    state => state.profile.fetchOverviewPosts
  );
  const fetchActivitiy = useAppStore(state => state.profile.fetchActivity);
  const currentUser = useAppStore(state => state.currentUser.userMe);
  const searchPosts = useAppStore(state => state.profile.searchPosts);
  const fetchSearchPosts = useAppStore(state => state.profile.fetchSearchPosts);

  const [postFilterQuery, setPostFilterQuery] = useState<string>();
  const [activeTab, setActiveTab] =
    useState<(typeof tabNavItems)[number]['value']>('posts');
  const { user } = useAuthenticationContext();

  useEffect(() => {
    fetchProfile(username, user?.id).then(async succeed => {
      if (!succeed) navigate('/docs/');
      fetchOverviewPosts();
      fetchActivitiy();
    });
  }, [username]);

  const isOwnProfile = useMemo(
    () => profile?.username === currentUser?.username,
    [profile?.username, currentUser?.username]
  );

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
    mainContent = <ProfileOverview isOwnProfile={isOwnProfile} />;
  } else {
    mainContent = (
      <PostList
        fetchPosts={(query: string, offset: number) =>
          fetchSearchPosts(query, SEARCH_LIMIT, offset)
        }
        postData={searchPosts}
        previewType="list"
        paginationType="load-more"
        defaultFilterQuery={postFilterQuery}
        setFilterQuery={setPostFilterQuery}
        currentQuery={postFilterQuery}
        toggleRating={() => {}} //TODO: implement toggleLike with API call
        hidePostAuthor
        showControls
        maxItems={SEARCH_LIMIT}
        showPostPrivacy={isOwnProfile}
      />
    );
  }

  useEffect(() => {
    setActiveTab(hash === '#posts' ? 'posts' : 'overview');
  }, []);

  //TODO: Fix hydration issue
  return (
    <>
      <HStack justifyContent="center" p={3} position="sticky">
        {tabNavButtons}
      </HStack>
      <MainGrid mt={10}>
        <Box>
          <LeftNavProfile isOwnProfile={isOwnProfile} />
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
