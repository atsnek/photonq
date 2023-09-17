import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import TbUserPlus from '../../../../shared/components/icons/tabler/TbUserPlus';
import TbUserMinus from '../../../../shared/components/icons/tabler/TbUserMinus';

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
    <Button
      w="full"
      colorScheme="gray"
      mt={3}
      size="sm"
      isLoading={isLoading}
      leftIcon={isFollowing ? <TbUserMinus /> : <TbUserPlus />}
      onClick={toggleFollowState}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default ProfileFollowButton;
