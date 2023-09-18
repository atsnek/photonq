import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  GridProps,
  HStack,
  Heading,
  IconButton,
  IconProps,
  StackProps,
  Text,
  Textarea,
  Tooltip,
  VStack,
  useBreakpointValue
} from '@chakra-ui/react';
import { FC, useRef, useState } from 'react';
import FeatherInbox from '../../../../shared/components/icons/feather/FeatherInbox';
import TbBuilding from '../../../../shared/components/icons/tabler/TbBuilding';
import TbLinkedIn from '../../../../shared/components/icons/tabler/TbLinkedIn';
import TbMapPin from '../../../../shared/components/icons/tabler/TbMapPin';
import { useNavOffset } from '../../../../shared/hooks/use-nav-offset';
import LeftNav, {
  ILeftNavProps
} from '../../../../shared/containers/navigation/LeftNav';
import LeftNavProfileSkeleton from './LeftNavProfileSkeleton';
import { useAppStore } from '../../../../shared/store/store';
import ProfileFollowButton from './ProfileFollowButton';
import TbUserEdit from '../../../../shared/components/icons/tabler/TbUserEdit';
import TbUserCheck from '../../../../shared/components/icons/tabler/TbUserCheck';
import TbUserCancel from '../../../../shared/components/icons/tabler/TbUserCancel';
import TbUsers from '../../../../shared/components/icons/tabler/TbUsers';

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
  socialInfo: {
    grid: {
      templateColumns: { base: 'repeat(4, auto)', md: '1fr' },
      gap: { base: 4, md: 1 },
      my: { base: 2, md: 5 }
    } as GridProps,
    gridItems: {
      verticalAlign: 'middle',
      gap: { base: 0.5, md: 2 }
    }
  }
};

interface LeftNavProfileProps {
  isOwnProfile: boolean;
}

/**
 * Sub-component of the profile page that displays the key information about the user.
 */
const LeftNavProfile: FC<LeftNavProfileProps> = ({ isOwnProfile }) => {
  const socialLinkIcons: { [key in TSocialLink]: FC<IconProps> } = {
    email: FeatherInbox,
    linkedin: TbLinkedIn,
    location: TbMapPin,
    company: TbBuilding
  };

  const navTopOffset = useNavOffset();
  const [viewMode, setViewMode] = useState<'read' | 'edit'>('read');
  const [isFollowUpdating, setIsFollowUpdating] = useState(false);
  // const [isUpdatingBio, setIsUpdatingBio] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const hideControlsFallback = useBreakpointValue({ base: true, md: false });
  const bioInputRef = useRef<HTMLTextAreaElement>(null);

  const userData = useAppStore(state => state.profile.profile);
  const toggleFollow = useAppStore(state => state.profile.toggleFollow);
  const isFollowing = useAppStore(state => state.profile.isFollowing);
  const changeBio = useAppStore(state => state.profile.changeBio);

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

  // const memoizedSocialLink = useMemo(() => {
  //   return user.socials?.map((data: any, idx: number) => {
  //     const { type, label } = data;
  //     const IconComp = socialLinkIcons[type as TSocialLink];
  //     return (
  //       <Fragment key={idx}>
  //         <GridItem
  //           {...leftNavProfileStyling.socialInfo.gridItems}
  //           as={HStack}
  //           // We currently display only the email link on mobile.
  //           display={{ base: type !== 'email' ? 'none' : 'flex', md: 'flex' }}
  //         >
  //           <IconComp
  //             strokeWidth={2.2}
  //             h="full"
  //             color="pages.userProfile.leftNav.socialLinks.icon.color"
  //           />
  //           {'url' in data ? (
  //             <Link
  //               href={data.url}
  //               _hover={{
  //                 color:
  //                   'pages.userProfile.leftNav.socialLinks.text.hover.color'
  //               }}
  //               transition="color 0.2s ease-in-out"
  //             >
  //               {label}
  //             </Link>
  //           ) : (
  //             <Text cursor="default">{label}</Text>
  //           )}
  //         </GridItem>
  //       </Fragment>
  //     );
  //   });
  // }, [userData?.socials]);

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
        <Avatar
          {...leftNavProfileStyling.avatar}
          name={userData.username}
          src={userData.avatarUrl}
          aspectRatio={1}
          _hover={{
            boxShadow: 'rgba(0, 0, 0, 0.2) 6px 12px 28px -5px',
            transform: 'scale(1.02)'
          }}
          transition="box-shadow 0.2s cubic-bezier(.17,.67,.83,.67), transform 0.2s cubic-bezier(.17,.67,.83,.67)"
        />
        <VStack {...leftNavProfileStyling.userData.stack}>
          <Heading
            as="h6"
            fontSize="24px"
            {...leftNavProfileStyling.userData.displayName}
          >
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
              {!isEditing && (
                <Text {...leftNavProfileStyling.bio}>{userData.bio}</Text>
              )}
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
              autoFocus
            />
          )}
          {!isOwnProfile && (
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
        {userData.socials.length > 0 && (
          <Divider {...leftNavProfileStyling.bioDividers} />
        )}
        {
          <HStack spacing={1} mt={2}>
            <TbUsers />
            <Text color="pages.userProfile.leftNav.followers.text.color">
              <Text
                as="span"
                color="pages.userProfile.leftNav.followers.count.color"
                mx={1}
              >
                5
              </Text>
              followers
            </Text>
          </HStack>
        }
        {/* <Grid {...leftNavProfileStyling.socialInfo.grid}>
          {memoizedSocialLink}
        </Grid> */}
      </VStack>
    </LeftNav>
  );
};

export default LeftNavProfile;
