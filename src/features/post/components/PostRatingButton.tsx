import { useAuthenticationContext } from '@atsnek/jaen';
import { Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';
import TbStar from '../../../shared/components/icons/tabler/TbStar';

interface IPostRatingButtonProps extends ButtonProps {
  isAuthor?: boolean;
  isRating: boolean;
  hasRated: boolean;
  toggleRating: () => void;
  stars: number;
}

/**
 * Button for rating a post.
 */
const PostRatingButton: FC<IPostRatingButtonProps> = ({
  isAuthor,
  isRating,
  hasRated,
  toggleRating,
  stars
}) => {
  const isAuthenticated = useAuthenticationContext().user !== null;
  return (
    <Button
      variant={isAuthor || !isAuthenticated ? 'invisible' : 'solid'}
      colorScheme="gray"
      size="sm"
      leftIcon={
        <TbStar
          fill={hasRated ? 'features.rating.rated.color' : 'transparent'}
          stroke={hasRated ? 'features.rating.rated.color' : 'currentColor'}
        />
      }
      onClick={toggleRating}
      isDisabled={isRating}
    >
      {stars}
    </Button>
  );
};

export default PostRatingButton;
