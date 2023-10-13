import { Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';
import TbUserPlus from '../../../../shared/components/icons/tabler/TbUserPlus';
import TbUserMinus from '../../../../shared/components/icons/tabler/TbUserMinus';

interface IProfileFollowButtonProps extends ButtonProps {
  isFollowing: boolean;
  toggleFollowState: () => void;
  isLoading: boolean;
}

const ProfileFollowButton: FC<IProfileFollowButtonProps> = ({
  isFollowing,
  toggleFollowState,
  isLoading,
  ...props
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
      {...props}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default ProfileFollowButton;
