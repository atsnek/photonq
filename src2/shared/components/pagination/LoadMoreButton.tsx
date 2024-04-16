import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { FC } from 'react';

interface ILoadMoreButtonProps {
  isDisabled?: boolean;
  onClick?: () => void;
}
/**
 * Component for displaying a button to load more items.
 */
const LoadMoreButton: FC<ILoadMoreButtonProps> = ({ isDisabled, onClick }) => {
  return (
    <Button
      variant="ghost-hover-outline"
      size="sm"
      borderRadius="lg"
      rightIcon={<ChevronRightIcon />}
      isDisabled={isDisabled}
      onClick={onClick}
    >
      Load more
    </Button>
  );
};

export default LoadMoreButton;
