// v3 no longer exports a color-mode hook; jaen re-exports one over next-themes.
import { useColorModeValue } from 'jaen';
import {
  Input,
  InputElementProps,
  InputGroup,
  InputProps,
  Kbd,
  Menu,
  useMenuContext
} from '@chakra-ui/react';
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useState
} from 'react';

import { getPlatform, isTouchDevice } from '../../utils/general';

export type TSearchInputStyleProps = {
  parent?: InputProps;
  kbd?: InputElementProps;
};

interface SearchInputProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  openFirstLink: () => void;
  styleProps?: TSearchInputStyleProps;
}

/**
 * The search input component for the search menu.
 */
// The ref lands on the input, which is what v2 handed to useMenuButton as well;
// only the element type it was declared with was wrong.
const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ setSearchQuery, openFirstLink, styleProps }, ref) => {
    const menu = useMenuContext();

    const [kbd, setKbd] = useState<string | null>(null);
    const focusBorderColor = useColorModeValue('theme.500', 'theme.700'); // We need this because semanticTokens seem to be broken for that prop

    useEffect(() => {
      const platform = getPlatform();

      if (menu.open) {
        setKbd('Esc');
      } else {
        setKbd(platform === 'mac' ? '⌘ K' : 'Ctrl+K');
      }
    }, [kbd]);

    useEffect(() => {
      // Focus the input when the user presses the shortcut
      const handleGlobalKeydown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          // v2 reached through the menu's buttonRef. v3 keeps no ref, but the
          // input is the trigger and the machine owns the trigger's id.
          const triggerId = menu.getTriggerProps().id;
          if (triggerId) document.getElementById(triggerId)?.focus();
        }

        if (e.key === 'Enter' && menu.open) {
          openFirstLink();
        }
      };

      window.addEventListener('keydown', handleGlobalKeydown);

      return () => {
        window.removeEventListener('keydown', handleGlobalKeydown);
      };
    }, []);

    // v2 wrapped all of this in Chakra's FocusLock whenever the menu stood open
    // with nothing highlighted. v3 exports no FocusLock, and its menu machine
    // already parks focus on the trigger until an item is highlighted, so the
    // wrapper is dropped rather than rebuilt.
    return (
      <InputGroup
        // v2 nested the Kbd inside an InputRightElement; v3's group renders
        // that element itself and takes its content as a prop.
        endElement={
          isTouchDevice() ? undefined : (
            <Kbd
              borderBottomWidth={1}
              background="transparent"
              // 4px, not 4. See SearchButton: the radii scale has no numeric
              // keys, so the bare number reaches the browser as invalid CSS.
              borderRadius="4px"
              py={0.5}
              {...styleProps?.kbd}
            >
              {kbd}
            </Kbd>
          )
        }
        endElementProps={{ pr: '10px', color: 'topNav.input.kbd.color' }}
      >
        {/* v2 spread useMenuButton over the input to make it the menu's button.
            asChild is how v3 hands that role to a foreign element: Ark runs the
            child's handlers first and skips its own once they have called
            preventDefault, which is exactly what v2's callAllHandlers did, so
            the guards below still cancel the menu where they used to. */}
        <Menu.Trigger asChild>
          <Input
            ref={ref}
            type="text"
            htmlSize={20}
            // v2 read the size off the enclosing InputGroup. v3 has no such
            // context, the control carries its own size.
            size="sm"
            placeholder="Search"
            borderRadius="md"
            backgroundColor="blackAlpha.50"
            borderColor="topNav.input.borderColor"
            color="topNav.input.color"
            _placeholder={{
              color: 'topNav.input.color'
            }}
            pr="45px"
            _focus={{
              backgroundColor: 'topNav.input.focus.bgColor'
            }}
            css={{
              '--focus-color': focusBorderColor
            }}
            {...styleProps?.parent}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                menu.setOpen(false);

                // Clear input
                e.currentTarget.value = '';
              } else if (e.key === 'ArrowDown') {
                // v2 pushed the focus ring onto the second item by index and
                // swallowed the menu's own ArrowDown on the way. v3 highlights
                // items by value, so only the swallowing survives the port.
                e.preventDefault();
              }
            }}
            onClick={e => {
              // Cancel if the value is empty
              if (!e.currentTarget.value) {
                e.preventDefault();
              }

              // Otherwise the trigger's own handler opens the menu
            }}
            onInput={e => {
              const query = e.currentTarget.value.trim();
              if (!menu.open && query.length > 0) {
                menu.setOpen(true);
              }
              setSearchQuery(e.currentTarget.value.trim());
            }}
            onKeyDownCapture={e => {
              if (e.key === 'Escape') {
                // Close the menu and blur the input when the user presses the escape key
                menu.setOpen(false);
                e.currentTarget.blur();
              } else if (
                e.key === 'Enter' &&
                menu.open &&
                // v2 asked whether the focus ring sat on no item at all; v3
                // spells that as no highlighted value.
                menu.highlightedValue === null
              ) {
                // Open the link from the first result item
                // and close the menu automatically
                // when the user presses the enter key
                openFirstLink();
                menu.setOpen(false);
              }
            }}
          />
        </Menu.Trigger>
      </InputGroup>
    );
  }
);

export default SearchInput;
