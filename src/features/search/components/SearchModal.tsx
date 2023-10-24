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
import { FC, ReactNode, useEffect, useRef } from 'react';
import TbSearch from '../../../shared/components/icons/tabler/TbSearch';

interface ISearchModalProps {
  defaultQuery?: string;
  isOpen: boolean;
  onClose: () => void;
  searchResultItems: ReactNode[];
  setSearchQuery: (query: string) => void;
}

const SearchModal: FC<ISearchModalProps> = ({
  defaultQuery,
  isOpen,
  onClose,
  searchResultItems,
  setSearchQuery
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent top="10px" m={0} w="75vw" h="fit-content" minH={0} borderRadius="lg">
        <ModalBody px={4} overflow="hidden" color="shared.text.default">
          <InputGroup size="sm">
            <InputLeftElement pointerEvents="none">
              <TbSearch />
            </InputLeftElement>
            <Input
              ref={inputRef}
              placeholder="Search documentation"
              size="sm"
              borderRadius="lg"
              focusBorderColor="brand.500"
              onChange={e => {
                setSearchQuery(e.target.value);
              }}
              defaultValue={defaultQuery}
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
