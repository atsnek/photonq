import {
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  GridProps,
  HStack,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  StackProps,
  Text,
  Textarea,
  Tooltip,
  VStack,
  useBreakpointValue
} from '@chakra-ui/react';
import { Dispatch, FC, ReactNode, SetStateAction, useMemo, useRef, useState } from 'react';
import { useNavOffset } from '../../../../shared/hooks/use-nav-offset';
import LeftNav, { ILeftNavProps } from '../../../../shared/containers/navigation/LeftNav';
import LeftNavProfileSkeleton from './LeftNavProfileSkeleton';
import { useAppStore } from '../../../../shared/store/store';
import ProfileFollowButton from './ProfileFollowButton';
import TbUserEdit from '../../../../shared/components/icons/tabler/TbUserEdit';
import TbUserCheck from '../../../../shared/components/icons/tabler/TbUserCheck';
import TbUserCancel from '../../../../shared/components/icons/tabler/TbUserCancel';
import { uploadFile, useAuthenticationContext } from '@atsnek/jaen';
import { capitalizeWord, formatNumber } from '../../../../shared/utils/utils';
import { TProfileStatType, TProfileTab } from '../../types/user';
import { userStatIcons } from '../../../../shared/vars/user';
import Image from '../../../../shared/components/image/Image';
import { fallbackUserAvatar } from '../../variables/user';

export type TSocialLink = 'email' | 'linkedin' | 'location' | 'company';

export const leftNavProfileStyling = {
  wrapperStack: {
    alignItems: { base: 'center', md: 'start' },
    textAlign: { base: 'center', md: 'left' }
  } as StackProps,
  avatar: {
    width: {
      base: '150px',
      md: 'full'
    },
    h: 'max-content'
  },
  userData: {
    stack: {
      w: 'full',
      alignItems: { base: 'center', md: 'start' },
      spacing: 0
    } as StackProps,
    displayName: {
      mt: 2
    }
  },
  bioDividers: {
    mt: 2
  },
  bio: {
    mt: 2,
    color: 'pages.userProfile.leftNav.bio.color',
    fontSize: '16px'
  },
  stats: {
    grid: {
      templateColumns: { base: 'repeat(2, auto)', sm: 'repeat(4, auto)', md: '1fr' },
      gap: { base: 4, md: 1 },
      mt: { base: 2, md: 2 }
    } as GridProps,
    gridItems: {
      verticalAlign: 'middle',
      gap: { base: 0.5, md: 3 }
    }
  }
};

interface LeftNavProfileProps {
  isOwnProfile: boolean;
  setActiveTab: Dispatch<SetStateAction<TProfileTab>>;
}

/**
 * Sub-component of the profile page that displays the key information about the user.
 */
const LeftNavProfile: FC<LeftNavProfileProps> = ({ isOwnProfile, setActiveTab }) => {
  const navTopOffset = useNavOffset();
  const isAuthenticated = useAuthenticationContext().user !== null;
  const [viewMode, setViewMode] = useState<'read' | 'edit'>('read');
  const [isFollowUpdating, setIsFollowUpdating] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const hideControlsFallback = useBreakpointValue({ base: true, md: false });
  const bioInputRef = useRef<HTMLTextAreaElement>(null);

  const userData = useAppStore(state => state.profile.profile);
  const toggleFollow = useAppStore(state => state.profile.toggleFollow);
  const isFollowing = useAppStore(state => state.profile.isFollowing);
  const changeBio = useAppStore(state => state.profile.changeBio);
  const changeProfilePicture = useAppStore(state => state.profile.changeProfilePicture);

  const [isUpdatingProfileImage, setIsUpdatingProfileImage] = useState(false);
  const updateUserDetails = useAuthenticationContext().updateDetails;

  const handleToggleFollow = async () => {
    setIsFollowUpdating(true);
    await toggleFollow();
    setIsFollowUpdating(false);
  };

  const saveProfileChanges = async () => {
    if (!bioInputRef.current) return false;
    await changeBio(bioInputRef.current?.value ?? '');
    return true;
  };

  const handleToggleViewMode = async () => {
    setIsUpdatingProfile(true);
    if (isEditing) {
      await saveProfileChanges();
    }
    setViewMode(isEditing ? 'read' : 'edit');
    setIsUpdatingProfile(false);
  };

  const cancelProfileUpdate = () => {
    setViewMode('read');
    if (!bioInputRef.current) return;
    bioInputRef.current.value = userData?.bio ?? '';
  };

  const handleUpdateProfileImage = async (avatarFile: File) => {
    setIsUpdatingProfileImage(true);
    await updateUserDetails({ avatarFile });
    changeProfilePicture(avatarFile);
    setIsUpdatingProfileImage(false);
  };

  const statElements = useMemo(() => {
    const output: ReactNode[] = [];
    for (const key in userData?.stats) {
      const label = capitalizeWord(key);
      const IconComp = userStatIcons[key as TProfileStatType];

      if (!IconComp) continue; // If this doesnt exist, we dont want to show it

      const icon = (
        <IconComp
          strokeWidth={2.2}
          h="full"
          color="pages.userProfile.leftNav.socialLinks.icon.color"
        />
      );
      const statValue = (
        <Text
          as="span"
          color="pages.userProfile.leftNav.stats.count.color"
          fontWeight="semibold"
          mr={1}
        >
          {formatNumber(userData.stats[key as TProfileStatType])}
        </Text>
      );

      if (key === 'followers' || key === 'following' || key === 'experiments') {
        output.push(
          <GridItem key={key} {...leftNavProfileStyling.stats.gridItems} as={HStack}>
            {icon}
            <LinkBox
              as={HStack}
              spacing={0}
              _hover={{
                '& *': {
                  color: 'pages.userProfile.leftNav.stats.link._hover.color'
                }
              }}
              onClick={() => setActiveTab(key)}
            >
              {statValue}
              <LinkOverlay href={`#${key}`}>{label}</LinkOverlay>
            </LinkBox>
          </GridItem>
        );
      } else {
        output.push(
          <GridItem key={key} {...leftNavProfileStyling.stats.gridItems} as={HStack}>
            {icon}
            <Text cursor="default">
              {statValue}
              {label}
            </Text>
          </GridItem>
        );
      }
    }
    return output;
  }, [userData?.stats]);

  const leftNavProps: ILeftNavProps = {
    hideControls: hideControlsFallback,
    isExpanded: true,
    h: {
      base: 'max-content',
      md: `calc(100vh - 50px - ${navTopOffset})`
    },
    top: `calc(20px + ${navTopOffset})`,
    minH: 'fit-content',
    w: 'full',
    mb: { base: 10, md: 0 }
  };

  if (!userData) {
    return (
      <LeftNav {...leftNavProps}>
        <LeftNavProfileSkeleton />
      </LeftNav>
    );
  }

  const isEditing = viewMode === 'edit';
  return (
    <LeftNav {...leftNavProps}>
      <VStack
        {...leftNavProfileStyling.wrapperStack}
        __css={{
          '& img': {
            // We need this to force the image to be a square
            h: 'auto',
            aspectRatio: '1 / 1',
            objectPosition: 'top' //? Maybe we can make this configurable
          }
        }}
      >
        <Image
          {...leftNavProfileStyling.avatar}
          src={userData.avatarUrl || fallbackUserAvatar}
          aspectRatio={1}
          _hover={{
            boxShadow: 'rgba(0, 0, 0, 0.2) 6px 12px 28px -5px',
            transform: 'scale(1.02)'
          }}
          borderRadius="full"
          transition="box-shadow 0.2s cubic-bezier(.17,.67,.83,.67), transform 0.2s cubic-bezier(.17,.67,.83,.67)"
          editable={isOwnProfile}
          handleImageChange={handleUpdateProfileImage}
          isUploading={isUpdatingProfileImage}
        />
        <VStack {...leftNavProfileStyling.userData.stack}>
          <Heading as="h6" fontSize="24px" {...leftNavProfileStyling.userData.displayName}>
            {userData.displayName}
          </Heading>
          <Text
            fontSize="16px"
            color="pages.userProfile.leftNav.username.color.inactive"
            _hover={{
              color: 'pages.userProfile.leftNav.username.color.hover'
            }}
            transition="color 0.2s ease-in-out"
            cursor="pointer"
          >
            @{userData.username}
          </Text>
          {
            //* Maybe this would be a neat place to put the total amount of favs/likes, etc (some kind of stats)
          }
          {userData.bio && (
            <>
              <Divider {...leftNavProfileStyling.bioDividers} />
              {!isEditing && <Text {...leftNavProfileStyling.bio}>{userData.bio}</Text>}
            </>
          )}
          {isEditing && (
            <Textarea
              {...leftNavProfileStyling.bio}
              ref={bioInputRef}
              defaultValue={userData.bio ?? ''}
              placeholder="Write a short bio about yourself"
              size="sm"
              borderRadius="lg"
              maxLength={200}
              maxH="500px"
              focusBorderColor="theme.500"
              autoFocus
            />
          )}
          {!isOwnProfile && isAuthenticated && (
            <ProfileFollowButton
              isFollowing={isFollowing ?? false}
              isLoading={isFollowUpdating}
              toggleFollowState={handleToggleFollow}
            />
          )}
          {isOwnProfile && (
            <Flex mt={3} w="full">
              <Button
                flex={1}
                w="full"
                colorScheme="gray"
                size="sm"
                leftIcon={isEditing ? <TbUserCheck /> : <TbUserEdit />}
                onClick={handleToggleViewMode}
                isLoading={isUpdatingProfile}
              >
                {isEditing ? 'Finish editing' : 'Edit profile'}
              </Button>
              {isEditing && (
                <Tooltip label="Cancel editing" openDelay={500}>
                  <IconButton
                    icon={<TbUserCancel />}
                    aria-label="Cancel editing"
                    colorScheme="gray"
                    ml={2}
                    size="sm"
                    onClick={cancelProfileUpdate}
                  />
                </Tooltip>
              )}
            </Flex>
          )}
        </VStack>
        {userData.stats && Object.values(userData.stats).some(value => value > 0) && (
          <Divider {...leftNavProfileStyling.bioDividers} mt={0} />
        )}
        <Grid {...leftNavProfileStyling.stats.grid}>{statElements}</Grid>
      </VStack>
    </LeftNav>
  );
};

export default LeftNavProfile;
