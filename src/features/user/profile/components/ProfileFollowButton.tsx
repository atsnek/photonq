import { Button } from '@chakra-ui/react';
import { FC } from 'react';

interface IProfileFollowButtonProps {
  isFollowing: boolean;
  toggleFollowState: () => void;
  isLoading: boolean;
}

const ProfileFollowButton: FC<IProfileFollowButtonProps> = ({
  isFollowing,
  toggleFollowState,
  isLoading
}) => {
  return (
    <Button w="full" colorScheme="gray" mt={3} size="sm">
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default ProfileFollowButton;
