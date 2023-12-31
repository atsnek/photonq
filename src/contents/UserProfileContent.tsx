import { Box, Button, HStack, Stack, Tag } from '@chakra-ui/react';
import {
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState
} from 'react';
import MainGrid from '../shared/containers/components/MainGrid';
import LeftNavProfile from '../features/user/profile/components/LeftNavProfile';
import PostList from '../features/post/PostList';
import ProfileOverview from '../features/user/profile/components/ProfileOverview';
import { navigate, useLocation } from '@reach/router';
import TbUser from '../shared/components/icons/tabler/TbUser';
import { FaFlask } from '@react-icons/all-files/fa/FaFlask';
import { useAuthenticationContext } from '@atsnek/jaen';
import { useAppStore } from '../shared/store/store';
import { POST_FETCH_LIMIT } from './PostsContent';
import TbStar from '../shared/components/icons/tabler/TbStar';
import { TProfileTab } from '../features/user/types/user';
import { formatNumber } from '../shared/utils/utils';
import UserList from '../features/user/user-list/components/UserList';

const tabNavItems: Array<{
  label: string;
  value: TProfileTab;
  icon: ReactElement;
}> = [
  {
    label: 'Overview',
    value: 'overview',
    icon: <TbUser />
  },
  {
    label: 'Experiments',
    value: 'experiments',
    icon: <FaFlask />
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
  const [activeTab, setActiveTab] =
    useState<(typeof tabNavItems)[number]['value']>('experiments');
  const { user } = useAuthenticationContext();

  const resetProfile = useAppStore(state => state.profile.reset);
  const profile = useAppStore(state => state.profile.profile);
  const fetchProfile = useAppStore(state => state.profile.fetchProfile);
  const fetchOverviewPosts = useAppStore(
    state => state.profile.fetchOverviewPosts
  );
  const fetchActivitiy = useAppStore(state => state.profile.fetchActivity);
  const currentUser = useAppStore(state => state.currentUser.userMe);
  const searchPosts = useAppStore(state => state.profile.searchPosts);
  const fetchSearchPosts = useAppStore(state => state.profile.fetchSearchPosts);
  const setPostListLanguage = useAppStore(
    state => state.profile.setPostListLanguage
  );
  const togglePostRating = useAppStore(state => state.profile.togglePostRating);
  const togglePostPrivacy = useAppStore(
    state => state.profile.togglePostPrivacy
  );
  const setPostListDateRange = useAppStore(
    state => state.profile.setPostListDateRange
  );
  const starredPosts = useAppStore(state => state.profile.starredPosts);
  const fetchStarredPosts = useAppStore(
    state => state.profile.fetchStarredPosts
  );
  const fetchFollowers = useAppStore(state => state.profile.fetchFollowers);
  const followers = useAppStore(state => state.profile.followers);
  const fetchFollowingUsers = useAppStore(
    state => state.profile.fetchFollowingUsers
  );
  const followingUsers = useAppStore(state => state.profile.followingUsers);
  const toggleFollow = useAppStore(state => state.profile.toggleFollow);
  const deletePost = useAppStore(state => state.profile.deletePost);

  useEffect(() => {
    resetProfile();
    setPostFilterQuery(undefined);

    let tab: TProfileTab = 'overview';
    switch (hash) {
      case '#experiments':
      case '#experiments':
        tab = 'experiments';
        break;
      case '#stars':
      case '#star':
        tab = 'stars';
        break;
      case '#followers':
      case '#follower':
        tab = 'followers';
        break;
      case '#following':
        tab = 'following';
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
    if (
      activeTab === 'experiments' &&
      searchPosts.items.length === 0 &&
      searchPosts.query.length === 0
    ) {
      fetchSearchPosts('', POST_FETCH_LIMIT, 0);
    } else if (
      activeTab === 'stars' &&
      starredPosts.items.length === 0 &&
      starredPosts.query.length === 0
    ) {
      fetchStarredPosts('', POST_FETCH_LIMIT, 0);
    } else if (activeTab === 'followers' && followers.items.length === 0) {
      fetchFollowers();
    } else if (activeTab === 'following' && followingUsers.items.length === 0) {
      fetchFollowingUsers();
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
        let label: ReactNode = item.label;

        if (item.value === 'stars' || item.value === 'experiments') {
          const count =
            profile?.stats?.[item.value === 'stars' ? 'starred' : 'experiments'] ?? 0;
          if (count > 0) {
            label = (
              <>
                {item.label}
                <Tag ml={2} size="sm" colorScheme="gray">
                  {formatNumber(count)}
                </Tag>
              </>
            );
          }
        }

        return (
          <Button
            key={item.value}
            variant="ghost-hover-opacity"
            size="sm"
            px={5}
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
            {label}
          </Button>
        );
      }),
    [tabNavItems, activeTab, profile, profile?.stats]
  );

  let mainContent: ReactNode;
  switch (activeTab) {
    case 'experiments':
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
          toggleRating={id => togglePostRating(id, 'experiments')}
          hidePostAuthor
          showControls
          isOwnProfile={isOwnProfile}
          maxItems={POST_FETCH_LIMIT}
          togglePostPrivacy={togglePostPrivacy}
          filterLanguage={searchPosts.language}
          setFilterLanguage={language =>
            setPostListLanguage('all-experiments', language)
          }
          dateRange={searchPosts.dateRange}
          setDateRange={(from, to) =>
            setPostListDateRange(from, to, 'all-experiments')
          }
          deletePost={deletePost}
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
          isOwnProfile={isOwnProfile}
          previewType="list"
          paginationType="load-more"
          maxItems={POST_FETCH_LIMIT}
          filterLanguage={starredPosts.language}
          setFilterLanguage={language =>
            setPostListLanguage('starred-experiments', language)
          }
          dateRange={starredPosts.dateRange}
          setDateRange={(from, to) =>
            setPostListDateRange(from, to, 'starred-experiments')
          }
          defaultFilterQuery={starredPosts.query}
          deletePost={deletePost}
        />
      );
      break;
    case 'followers':
      mainContent = (
        <UserList
          listData={followers}
          toggleFollow={toggleFollow}
          fetchItems={fetchFollowers}
        />
      );
      break;
    case 'following':
      mainContent = (
        <UserList
          listData={followingUsers}
          toggleFollow={toggleFollow}
          fetchItems={fetchFollowingUsers}
        />
      );
      break;
    default:
      mainContent = (
        <ProfileOverview
          isOwnProfile={isOwnProfile}
          togglePostPrivacy={togglePostPrivacy}
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
          <LeftNavProfile
            isOwnProfile={isOwnProfile}
            setActiveTab={setActiveTab}
          />
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
