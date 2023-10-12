import { Box, Button, HStack, Stack } from '@chakra-ui/react';
import { FC, ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import MainGrid from '../shared/containers/components/MainGrid';
import LeftNavProfile from '../features/user/profile/components/LeftNavProfile';
import PostList from '../features/post/PostList';
import ProfileOverview from '../features/user/profile/components/ProfileOverview';
import { navigate, useLocation } from '@reach/router';
import TbUser from '../shared/components/icons/tabler/TbUser';
import TbBook from '../shared/components/icons/tabler/TbBook';
import { useAuthenticationContext } from '@atsnek/jaen';
import { useAppStore } from '../shared/store/store';
import { POST_FETCH_LIMIT } from './PostsContent';
import TbStar from '../shared/components/icons/tabler/TbStar';
import { TProfileTab } from '../features/user/types/user';

const tabNavItems: Array<{ label: string; value: TProfileTab; icon: ReactElement }> = [
  {
    label: 'Overview',
    value: 'overview',
    icon: <TbUser />
  },
  {
    label: 'Posts',
    value: 'posts',
    icon: <TbBook />
  },
  {
    label: 'Stars',
    value: 'stars',
    icon: <TbStar />
  }
];

interface IUserProfileContent {
  username: string;
}

/**
 * Component for displaying a certain user profile.
 */
const UserProfileContent: FC<IUserProfileContent> = ({ username }) => {
  const { hash } = useLocation();
  const [postFilterQuery, setPostFilterQuery] = useState<string>();
  const [activeTab, setActiveTab] = useState<(typeof tabNavItems)[number]['value']>('posts');
  const { user } = useAuthenticationContext();

  const resetProfile = useAppStore(state => state.profile.reset);
  const profile = useAppStore(state => state.profile.profile);
  const fetchProfile = useAppStore(state => state.profile.fetchProfile);
  const fetchOverviewPosts = useAppStore(state => state.profile.fetchOverviewPosts);
  const fetchActivitiy = useAppStore(state => state.profile.fetchActivity);
  const currentUser = useAppStore(state => state.currentUser.userMe);
  const searchPosts = useAppStore(state => state.profile.searchPosts);
  const fetchSearchPosts = useAppStore(state => state.profile.fetchSearchPosts);
  const searchPostLanguage = useAppStore(state => state.profile.searchPostLanguage);
  const setSearchPostLanguage = useAppStore(state => state.profile.setSearchPostLanguage);
  const togglePostRating = useAppStore(state => state.profile.togglePostRating);
  const togglePostPrivacy = useAppStore(state => state.profile.togglePostPrivacy);
  const searchPostDateRange = useAppStore(state => state.profile.searchPostsDateRange);
  const setSearchPostDateRange = useAppStore(state => state.profile.setSearchPostsDateRange);
  const starredPosts = useAppStore(state => state.profile.starredPosts);
  const fetchStarredPosts = useAppStore(state => state.profile.fetchStarredPosts);

  useEffect(() => {
    resetProfile();
    setPostFilterQuery(undefined);

    let tab: TProfileTab = 'overview';
    switch (hash) {
      case '#posts':
      case '#post':
        tab = 'posts';
        break;
      case '#stars':
      case '#star':
        tab = 'stars';
        break;
    }
    setActiveTab(tab);

    fetchProfile(username, user?.id).then(async succeed => {
      if (!succeed) navigate('/docs/');
      fetchOverviewPosts();
      fetchActivitiy();
    });
  }, [username]);

  useEffect(() => {
    if (activeTab === 'posts' && searchPosts.items.length === 0 && searchPosts.query.length === 0) {
      fetchSearchPosts('', POST_FETCH_LIMIT, 0);
    } else if (
      activeTab === 'stars' &&
      starredPosts.items.length === 0 &&
      starredPosts.query.length === 0
    ) {
      fetchStarredPosts('', POST_FETCH_LIMIT, 0);
    }
  }, [activeTab, profile]);

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
  switch (activeTab) {
    case 'overview':
      mainContent = (
        <ProfileOverview isOwnProfile={isOwnProfile} togglePostPrivacy={togglePostPrivacy} />
      );
      break;
    case 'posts':
      mainContent = (
        <PostList
          fetchPosts={(query, limit, offset, language) =>
            fetchSearchPosts(query, POST_FETCH_LIMIT, offset, language)
          }
          postData={searchPosts}
          previewType="list"
          paginationType="load-more"
          defaultFilterQuery={postFilterQuery}
          setFilterQuery={setPostFilterQuery}
          currentQuery={postFilterQuery}
          toggleRating={id => togglePostRating(id, 'posts')}
          hidePostAuthor
          showControls
          maxItems={POST_FETCH_LIMIT}
          showPostPrivacy={isOwnProfile}
          togglePostPrivacy={togglePostPrivacy}
          filterLanguage={searchPostLanguage}
          setFilterLanguage={setSearchPostLanguage}
          dateRange={searchPostDateRange}
          setDateRange={setSearchPostDateRange}
        />
      );
      break;
    case 'stars':
      mainContent = (
        <PostList
          postData={starredPosts}
          fetchPosts={(query, limit, offset, language) =>
            fetchStarredPosts(query, limit, offset, language)
          }
          toggleRating={id => togglePostRating(id, 'stars')}
          showControls
          previewType="list"
          paginationType="load-more"
          maxItems={POST_FETCH_LIMIT}
        />
      );
      break;
  }

  return (
    <>
      <HStack justifyContent="center" p={3} position="sticky">
        {tabNavButtons}
      </HStack>
      <MainGrid mt={10}>
        <Box>
          <LeftNavProfile isOwnProfile={isOwnProfile} />
        </Box>
        <Stack verticalAlign="top" spacing={{ base: 0, xl: 12 }} direction="row">
          <Box w="full">{mainContent}</Box>
        </Stack>
      </MainGrid>
    </>
  );
};

export default UserProfileContent;
