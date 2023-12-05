import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Kbd, useMediaQuery } from '@chakra-ui/react';
import { FC } from 'react';

interface ISearchButtonProps {
  openModal: () => void;
  navigate: (isUp: boolean) => void;
}

/**
 * Search button component - shows a button that opens the search menu
 */
const SearchButton: FC<ISearchButtonProps> = ({ openModal, navigate }) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)'); // Adjust the breakpoint as needed

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      openModal;
    } else if (e.key === 'ArrowDown') {
      navigate(false);
    } else if (e.key === 'ArrowUp') {
      navigate(true);
    }
  };

  if (isMobile) {
    return (
      <IconButton
        size="sm"
        variant="outline"
        bgColor="blackAlpha.50"
        color="topNav.input.color"
        borderColor="topNav.input.borderColor"
        fontWeight="normal"
        icon={<SearchIcon />}
        aria-label="Search"
        onClick={openModal}
        onKeyDown={onKeyPress}
      >
        <Kbd
          borderBottomWidth={1}
          background="transparent"
          borderRadius={4}
          py={0.5}
          ml={3}
          opacity={0.7}
        >
          /
        </Kbd>
      </IconButton>
    );
  }

  return (
    <Button
      display="flex"
      size="sm"
      minH="9"
      variant="outline"
      bgColor="blackAlpha.50"
      color="topNav.input.color"
      borderColor="topNav.input.borderColor"
      fontWeight="normal"
      _hover={{
        borderColor: 'topNav.input.hover.borderColor'
      }}
      _active={{
        bgColor: 'topNav.input.active.bgColor'
      }}
      onFocus={e => {
        e.currentTarget.addEventListener('keypress', onKeyPress);
      }}
      onBlur={e => {
        e.currentTarget.removeEventListener('keypress', onKeyPress);
      }}
      onClick={openModal}
    >
      Type{' '}
      <Kbd
        borderBottomWidth={1}
        borderRadius={4}
        py={0.5}
        mx={2}
        bgColor={'transparent'}
        borderColor={'topNav.input.borderColor'}
        variant="outline"
      >
        /
      </Kbd>
      to search
    </Button>
  );
};

export default SearchButton;
