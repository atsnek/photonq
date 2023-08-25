import { FC } from 'react';
import { Button, HStack, Text } from '@chakra-ui/react';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';
import { formatNumber } from '../../../../shared/utils/utils';
import { TPostPreview } from '../../types/post';

interface IPostPreviewRatingProps {
  id: TPostPreview['id'];
  likes: number;
  hasLiked?: boolean;
  toggleLike: (id: TPostPreview['id']) => void;
  isPostManagable?: boolean;
  useHighContrast?: boolean;
}

/**
 * Component for displaying a post preview rating.
 */
const PostPreviewRating: FC<IPostPreviewRatingProps> = ({
  id,
  likes,
  hasLiked,
  toggleLike,
  isPostManagable,
  useHighContrast
}) => {
  if (!isPostManagable) {
    return (
      <Button
        display="flex"
        variant="unstyled"
        size="sm"
        color={`features.rating.${hasLiked ? 'rated' : 'unrated'}.color`}
        _hover={{
          color: `features.rating._hover.color`,
          bgColor: `features.rating._hover${
            useHighContrast ? '.highContrast' : ''
          }.bgColor`
        }}
        onClick={() => toggleLike(id)}
        px={2}
        zIndex={1} // prevents the button to to be placed underneath the link overlay
        transition="color 0.2s ease-in-out, background-color 0.2s ease-in-out"
      >
        <TbStar
          boxSize={3}
          mr={1}
          fill={hasLiked ? 'currentColor' : 'none'}
          stroke={hasLiked ? 'none' : 'currentColor'}
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
