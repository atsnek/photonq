import { FC } from 'react';
import { Button, HStack, Text } from '@chakra-ui/react';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';
import { formatNumber } from '../../../../shared/utils/utils';
import { TPostPreview } from '../../types/post';

interface IPostPreviewRatingProps {
  id: TPostPreview['id'];
  likes: number;
  hasRated?: boolean;
  isRating?: boolean;
  isAuthor?: boolean;
  toggleRating: (id: TPostPreview['id']) => void;
  canRate?: boolean;
  useHighContrast?: boolean;
}

/**
 * Component for displaying a post preview rating.
 */
const PostPreviewRating: FC<IPostPreviewRatingProps> = ({
  id,
  likes,
  hasRated,
  isRating,
  isAuthor,
  toggleRating,
  canRate,
  useHighContrast
}) => {
  if (canRate) {
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
        onClick={!isAuthor && toggleRating ? () => toggleRating(id) : undefined}
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

export default PostPreviewRating;
