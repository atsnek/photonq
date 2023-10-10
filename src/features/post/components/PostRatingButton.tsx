import { useAuthenticationContext } from '@atsnek/jaen';
import { Button, ButtonProps, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import TbStar from '../../../shared/components/icons/tabler/TbStar';

interface IPostRatingButtonProps extends ButtonProps {
  isAuthor?: boolean;
  isRating: boolean;
  hasRated: boolean;
  toggleRating: () => void;
  stars: number;
  showTooltip?: boolean;
}

/**
 * Button for rating a post.
 */
const PostRatingButton: FC<IPostRatingButtonProps> = ({
  isAuthor,
  isRating,
  hasRated,
  toggleRating,
  stars,
  showTooltip = true,
  ...props
}) => {
  const isAuthenticated = useAuthenticationContext().user !== null;

  const canRate = isAuthenticated && !isAuthor;

  const rating = (
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
      {...props}
    >
      {stars}
    </Button>
  );

  if (canRate && showTooltip) {
    const label = `${hasRated ? 'Unr' : 'R'}ate this post`;
    return (
      <Tooltip label={label} aria-label={label} placement="bottom" openDelay={500}>
        {rating}
      </Tooltip>
    );
  }

  return rating;
};

export default PostRatingButton;
