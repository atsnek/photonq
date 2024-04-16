import {
  FocusLock,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  InputRightElementProps,
  Kbd,
  useColorModeValue,
  useMenuButton,
  useMenuContext
} from '@chakra-ui/react';
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useMemo,
  KeyboardEvent as ReactKeyboardEvent,
  useState
} from 'react';

import { getPlatform, isTouchDevice } from '../../../shared/utils/utils';

export type TSearchInputStyleProps = {
  parent?: InputProps;
  kbd?: InputRightElementProps;
};

interface SearchInputProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  openFirstLink: () => void;
  styleProps?: TSearchInputStyleProps;
}

/**
 * The search input component for the search menu.
 */
const SearchInput = forwardRef<HTMLDivElement, SearchInputProps>(
  ({ setSearchQuery, openFirstLink, styleProps }, ref) => {
    const menu = useMenuContext();
    const menuButton = useMenuButton(
      {
        onKeyDown: (e: ReactKeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Escape') {
            menu.onClose();

            // Clear input
            e.currentTarget.value = '';
          } else if (e.key === 'ArrowDown') {
            if (menu.isOpen) {
              menu.setFocusedIndex(1);
            }

            // Prevent default behavior
            e.preventDefault();
          }
        }
      },
      ref
    );

    // console.log("menuButton['aria-controls']", menuButton['aria-label']);

    const [kbd, setKbd] = useState<string | null>(null);
    const focusBorderColor = useColorModeValue('theme.500', 'theme.700'); // We need this because semanticTokens seem to be broken for that prop

    useEffect(() => {
      const platform = getPlatform();

      if (menu.isOpen) {
        setKbd('Esc');
      } else {
        setKbd(platform === 'mac' ? '⌘ K' : 'Ctrl+K');
      }
    }, [kbd]);

    const isFocusLocked = useMemo(() => {
      return menu.isOpen && menu.focusedIndex === -1;
    }, [menu.isOpen, menu.focusedIndex]);

    useEffect(() => {
      // Focus the input when the user presses the shortcut
      const handleGlobalKeydown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k')
          menu.buttonRef.current?.focus();

        if (e.key === 'Enter' && menu.isOpen) {
          openFirstLink();
        }
      };

      window.addEventListener('keydown', handleGlobalKeydown);

      return () => {
        window.removeEventListener('keydown', handleGlobalKeydown);
      };
    }, []);

    useEffect(() => {
      if (!menu.isOpen) {
        menu.setFocusedIndex(-1);
      }
    }, [menu.isOpen]);

    return (
      <FocusLock isDisabled={!isFocusLocked}>
        <InputGroup size="sm">
          <Input
            type="text"
            htmlSize={20}
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
            focusBorderColor={focusBorderColor}
            {...menuButton}
            {...styleProps?.parent}
            onClick={e => {
              const value = e.currentTarget.value;

              // Cancel if the value is empty
              if (!value) {
                return;
              }

              // Otherwise use the default behavior
              menuButton.onClick(e);
            }}
            onInput={e => {
              const query = e.currentTarget.value.trim();
              if (!menu.isOpen && query.length > 0) {
                menu.onOpen();
              }
              setSearchQuery(e.currentTarget.value.trim());
            }}
            onKeyDownCapture={e => {
              if (e.key === 'Escape') {
                // Close the menu and blur the input when the user presses the escape key
                menu.onClose();
                e.currentTarget.blur();
              } else if (
                e.key === 'Enter' &&
                menu.isOpen &&
                menu.focusedIndex === -1
              ) {
                // Open the link from the first result item
                // and close the menu automatically
                // when the user presses the enter key
                openFirstLink();
                menu.onClose();
              }
            }}
          />
          {!isTouchDevice() && (
            <InputRightElement
              children={
                <Kbd
                  borderBottomWidth={1}
                  background="transparent"
                  borderRadius={4}
                  py={0.5}
                  {...styleProps?.kbd}
                >
                  {kbd}
                </Kbd>
              }
              pr="10px"
              color="topNav.input.kbd.color"
            />
          )}
        </InputGroup>
      </FocusLock>
    );
  }
);

export default SearchInput;
