import {
  Box,
  Button,
  IconButton,
  Kbd,
  useBreakpointValue,
  useMediaQuery
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { getPlatform } from '../../../shared/utils/utils';
import { SearchIcon } from '@chakra-ui/icons';

interface ISearchButtonProps {
  openModal: () => void;
  navigate: (isUp: boolean) => void;
}

/**
 * Search button component - shows a button that opens the search menu
 */
const SearchButton: FC<ISearchButtonProps> = ({ openModal, navigate }) => {
  const [kbd, setKbd] = useState<string | null>(null);

  const [isMobile] = useMediaQuery('(max-width: 768px)'); // Adjust the breakpoint as needed

  useEffect(() => {
    setKbd(getPlatform() === 'mac' ? '⌘ K' : 'Ctrl+K');
  }, [kbd]);

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
        aria-label="Search documentation"
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
          {kbd}
        </Kbd>
      </IconButton>
    );
  }

  return (
    <Button
      display="flex"
      size="sm"
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
      <Box as="span">Search documentation</Box>

      <Kbd
        borderBottomWidth={1}
        background="transparent"
        borderRadius={4}
        py={0.5}
        ml={3}
        opacity={0.7}
      >
        {kbd}
      </Kbd>
    </Button>
  );
};

export default SearchButton;
