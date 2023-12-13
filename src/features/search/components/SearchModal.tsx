import {
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack
} from '@chakra-ui/react';
import { Dispatch, FC, KeyboardEvent, ReactNode, SetStateAction, useEffect, useRef } from 'react';
import TbSearch from '../../../shared/components/icons/tabler/TbSearch';

interface ISearchModalProps {
  defaultQuery?: string;
  isOpen: boolean;
  onClose: () => void;
  searchResultItems: ReactNode[];
  setSearchQuery: (query: string) => void;
  handleNavigate(isUp: boolean): void;
  openActiveItem: () => void;
}

const SearchModal: FC<ISearchModalProps> = ({
  defaultQuery,
  isOpen,
  onClose,
  searchResultItems,
  setSearchQuery,
  handleNavigate,
  openActiveItem
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleNavigate(false);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleNavigate(true);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      openActiveItem();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent
        top="10px"
        m={0}
        w={{ base: '95vw', md: '75vw' }}
        h="fit-content"
        minH={0}
        borderRadius="lg"
      >
        <ModalBody px={4} overflow="hidden" color="shared.text.default">
          <InputGroup size="sm">
            <InputLeftElement pointerEvents="none">
              <TbSearch />
            </InputLeftElement>
            <Input
              ref={inputRef}
              placeholder="Search"
              size="sm"
              borderRadius="lg"
              focusBorderColor="brand.400"
              onChange={e => {
                setSearchQuery(e.target.value);
              }}
              defaultValue={defaultQuery}
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
          <VStack
            mt={3}
            alignItems="start"
            fontSize="sm"
            __css={{
              '.sd-search-outer-section::-webkit-scrollbar-thumb': {
                borderRadius: 'full',
                backgroundColor: 'shared.scrollbar.thumb.bgColor',
                '&:hover': {
                  backgroundColor: 'shared.scrollbar.thumb.hover.bgColor'
                },
                transition: 'background-color 0.2s ease-in-out'
              },
              '.sd-search-outer-section::-webkit-scrollbar': {
                width: '4px',
                backgroundColor: 'transparent'
              }
            }}
          >
            {searchResultItems}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
