import { withRedux } from 'jaen';
import { Button, IconButton, Kbd } from '@chakra-ui/react';
import { FC } from 'react';
import { SearchIcon } from '../icons/chakra';

interface ISearchButtonProps {
  openModal: () => void;
  navigate: (isUp: boolean) => void;
}

/**
 * Search button component - shows a button that opens the search menu
 */
const SearchButton: FC<ISearchButtonProps> = withRedux(
  ({ openModal, navigate }) => {
    // const [isMobile] = useMediaQuery('(max-width: 768px)'); // Adjust the breakpoint as needed

    const onKeyPress = (e: any) => {
      if (e.key === 'Enter') {
        openModal;
      } else if (e.key === 'ArrowDown') {
        navigate(false);
      } else if (e.key === 'ArrowUp') {
        navigate(true);
      }
    };

    // if (isMobile) {
    //   return (
    //     <IconButton
    //       size="sm"
    //       variant="outline"
    //       bgColor="blackAlpha.50"
    //       color="topNav.input.color"
    //       borderColor="topNav.input.borderColor"
    //       fontWeight="normal"
    //       icon={<SearchIcon />}
    //       aria-label="Search"
    //       onClick={openModal}
    //       onKeyDown={onKeyPress}
    //     >
    //       <Kbd
    //         borderBottomWidth={1}
    //         background="transparent"
    //         borderRadius={4}
    //         py={0.5}
    //         ml={3}
    //         opacity={0.7}
    //       >
    //         /
    //       </Kbd>
    //     </IconButton>
    //   );
    // }

    return (
      <>
        <Button
          display={{
            base: 'none',
            md: 'flex'
          }}
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
            // 4px, not 4. The radii scale has no numeric keys, so v2 appended
            // the unit and v3 emits `border-radius: 4`, which the parser drops.
            borderRadius="4px"
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

        <IconButton
          display={{
            base: 'flex',
            md: 'none'
          }}
          variant="outline"
          bgColor="blackAlpha.50"
          color="topNav.input.color"
          borderColor="topNav.input.borderColor"
          fontWeight="normal"
          aria-label="Search"
          onClick={openModal}
          onKeyDown={onKeyPress}
        >
          {/* v2 took the glyph through an `icon` prop and wrapped it in a
              span; v3's IconButton is a Button that renders its children, so
              the icon is a child and the wrapper span is gone. */}
          <SearchIcon />
        </IconButton>
      </>
    );
  }
);

export default SearchButton;
