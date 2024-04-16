import { FC, useEffect, useState } from 'react';
import { Button, HStack, Text } from '@chakra-ui/react';
import TbStar from '../icons/tabler/TbStar';
import { formatNumber } from '../../utils/general';
import { useAuth } from '@atsnek/jaen';

interface PostCardRatingProps {
  id: string;
  likes: number;
  hasRated?: boolean;
  isRating?: boolean;
  isAuthor?: boolean;
  toggleRating: (id: string) => void;
  useHighContrast?: boolean;
}

/**
 * Component for displaying a post preview rating.
 */
const PostCardRating: FC<PostCardRatingProps> = ({
  id,
  isRating,
  isAuthor,
  toggleRating,
  useHighContrast,
  ...props
}) => {
  const { isAuthenticated } = useAuth();

  const [likes, setLikes] = useState(props.likes);

  useEffect(() => {
    setLikes(props.likes);
  }, [props.likes]);

  const [hasRated, setHasRated] = useState(props.hasRated);

  useEffect(() => {
    setHasRated(props.hasRated);
  }, [props.hasRated]);

  const handleRating = () => {
    setLikes(hasRated ? likes - 1 : likes + 1);
    setHasRated(!hasRated);

    toggleRating(id);
  };

  if (isAuthenticated) {
    return (
      <Button
        display="flex"
        variant="unstyled"
        size="sm"
        color={`features.rating.${hasRated ? 'rated' : 'unrated'}.color`}
        _hover={
          !isAuthor
            ? {
                color: `features.rating._hover.color`,
                bgColor: `features.rating._hover${
                  useHighContrast ? '.highContrast' : ''
                }.bgColor`
              }
            : {}
        }
        cursor={isAuthor ? 'default' : 'pointer'}
        onClick={handleRating}
        px={2}
        isDisabled={isRating}
        zIndex={1} // prevents the button to to be placed underneath the link overlay
        transition="color 0.2s ease-in-out, background-color 0.2s ease-in-out"
      >
        <TbStar
          boxSize={3}
          mr={1}
          fill={hasRated ? 'currentColor' : 'none'}
          stroke={hasRated ? 'none' : 'currentColor'}
          transition="fill 0.2s ease-in-out, stroke 0.2s ease-in-out"
        />
        <Text fontSize={12}>{formatNumber(likes)}</Text>
      </Button>
    );
  }
  return (
    <HStack
      spacing={1}
      color="features.rating.disabled.color"
      _hover={{
        color: 'features.rating._hover.disabled.color'
      }}
      transition="color 0.2s ease-in-out"
    >
      <TbStar boxSize={3} fill="none" stroke="currentColor" />
      <Text fontSize={12}>{formatNumber(likes)}</Text>
    </HStack>
  );
};

export default PostCardRating;
