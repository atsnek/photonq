import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  HStack,
  Input,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  StackProps,
  VStack,
  IconButton,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Collapse,
  Tooltip
} from '@chakra-ui/react';
import { ChangeEvent, FC, useMemo, useRef, useState } from 'react';
import { TDebounceData } from '../../shared/types/comm';
import { EnPostLanguage, TPostListData, TPostPreview } from './types/post';
import TbFilterDown from '../../shared/components/icons/tabler/TbFilterDown';
import TbFilterUp from '../../shared/components/icons/tabler/TbFilterUp';
import { wait } from '../../shared/utils/utils';
import TbPlus from '../../shared/components/icons/tabler/TbPlus';
import Link from '../../shared/components/Link';
import { sq } from '@snek-functions/origin';
import { formatPostDate } from '../../shared/utils/features/post';
import { useAuthenticationContext } from '@atsnek/jaen';

interface IPostListControlsProps extends StackProps {
  fetchPosts: (
    query: string,
    offset?: number,
    language?: EnPostLanguage | null
  ) => void;
  enableAdvancedSearch?: boolean;
  showCreatePostButton?: boolean;
  defaultQuery?: string;
  query: string;
  setQuery?: (query: string) => void;
  filterLanguage?: EnPostLanguage;
  setFilterLanguage?: (language: EnPostLanguage) => void;
  dateRange?: { from: Date | undefined; to: Date | undefined };
  setDateRange?: (
    from: Date | null | undefined,
    to: Date | null | undefined
  ) => void;
}

const PostListControls: FC<IPostListControlsProps> = ({
  fetchPosts,
  enableAdvancedSearch = true,
  showCreatePostButton,
  defaultQuery,
  filterLanguage,
  setFilterLanguage,
  query,
  setQuery,
  dateRange,
  setDateRange,
  ...props
}) => {
  const isAuthenticated = useAuthenticationContext().user !== null;
  const [activeSortOption, setActiveSortOption] =
    useState<(typeof sortOptions)[number]['value']>('recent');

  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const stateRef = useRef<TDebounceData>({
    state: 'inactive',
    timeout: undefined
  }); // Keep track of the current state of the search

  const dateFromRef = useRef<HTMLInputElement>(null);
  const dateToRef = useRef<HTMLInputElement>(null);

  const sortOptions = [
    {
      label: 'Recent',
      value: 'recent',
      onClick: () => {
        setActiveSortOption('recent');
      }
    },
    {
      label: 'Date',
      value: 'date',
      onClick: () => {
        setActiveSortOption('date');
      }
    },
    {
      label: 'Most Liked',
      value: 'most-liked',
      onClick: () => {
        setActiveSortOption('most-liked');
      }
    }
  ] as const;

  // const sortMenuItems = useMemo(() => {
  //   return sortOptions.map((option, i) => {
  //     const isActive = option.value === activeSortOption;
  //     return (
  //       <MenuItem
  //         key={i}
  //         onClick={option.onClick}
  //         position={isActive ? 'relative' : undefined}
  //       >
  //         {option.label}
  //         {isActive && (
  //           <CheckIcon
  //             position="absolute"
  //             right={3}
  //             boxSize="10px"
  //             color="brand.500"
  //           />
  //         )}
  //       </MenuItem>
  //     );
  //   });
  // }, [sortOptions, activeSortOption]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    if (setQuery) setQuery(query);

    clearTimeout(stateRef.current.timeout);
    stateRef.current.timeout = setTimeout(async () => {
      fetchPosts(query);
    }, 300);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!setFilterLanguage) return;
    const language =
      EnPostLanguage[e.currentTarget.value as keyof typeof EnPostLanguage];
    setFilterLanguage(language);
    fetchPosts(query, 0, language ?? null);
  };

  return (
    <VStack w="full">
      <HStack spacing={3} w="full" {...props}>
        <Input
          flex="1"
          placeholder="Find a experiment..."
          size="sm"
          borderRadius="lg"
          defaultValue={defaultQuery}
          onChange={handleInputChange}
          focusBorderColor="theme.600"
          //! focusBorderColor - semantic token not working
          // focusBorderColor="components.input._focus.borderColor"
          // bgColor="components.input._focus.borderColor"
        />
        {/* <Menu>
          <MenuButton
            as={Button}
            colorScheme="gray"
            size="sm"
            borderRadius="lg"
            variant="outline"
            fontWeight="semibold"
            minW="unset"
            rightIcon={
              <ChevronDownIcon display={{ base: 'none', sm: 'initial' }} />
            }
            sx={{
              '& .chakra-button__icon': {
                marginInlineStart: 0
              }
            }}
          >
            Sort
          </MenuButton>
          <MenuList zIndex={99}>{sortMenuItems}</MenuList>
        </Menu> */}
        {enableAdvancedSearch && (
          <IconButton
            colorScheme="gray"
            size="sm"
            variant="outline"
            icon={isAdvancedSearchOpen ? <TbFilterDown /> : <TbFilterUp />}
            aria-label={'Toggle advanced search filter visibility'}
            onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
          />
        )}
        {showCreatePostButton && isAuthenticated && (
          <Button
            aria-label="New experiment"
            as={Link}
            href="/new/experiment"
            size="sm"
            leftIcon={<TbPlus />}
          >
            New
          </Button>
        )}
      </HStack>
      <Collapse
        in={isAdvancedSearchOpen}
        animateOpacity
        style={{ width: '75%' }}
      >
        <HStack gap={5} w="full">
          {!!setDateRange && (
            <InputGroup size="sm">
              <InputLeftAddon borderLeftRadius="lg">Date from</InputLeftAddon>
              <Input
                ref={dateFromRef}
                type="date"
                onChange={e => {
                  const date = e.currentTarget.valueAsDate;
                  date?.setMonth(date.getMonth() + 1);

                  if (!date) return;

                  let dateTo: Date | null | undefined = undefined;
                  if (
                    date.getTime() >
                    (dateToRef.current?.valueAsDate?.getTime() ?? Infinity)
                  ) {
                    if (!dateToRef.current) return;
                    dateToRef.current.value = '';
                    dateTo = null;
                  }
                  console.log('date', date, dateTo);
                  setDateRange(
                    isNaN(date.getTime()) ? undefined : date,
                    dateTo
                  );
                }}
              />
              <InputRightAddon>Date to</InputRightAddon>
              <Input
                ref={dateToRef}
                type="date"
                sx={{ borderRightRadius: 'lg' }}
                onChange={e => {
                  const date = e.currentTarget.valueAsDate;
                  date?.setMonth(date.getMonth() + 1);
                  if (!date) return;
                  let dateFrom: Date | null | undefined = undefined;
                  if (
                    date.getTime() <
                    (dateFromRef.current?.valueAsDate?.getTime() ?? 0)
                  ) {
                    if (!dateFromRef.current) return;
                    dateFromRef.current.value = '';
                    dateFrom = null;
                  }
                  setDateRange(
                    dateFrom,
                    isNaN(date.getTime()) ? undefined : date
                  );
                }}
              />
            </InputGroup>
          )}
          {!!setFilterLanguage && (
            <Select
              placeholder="Language"
              size="sm"
              borderRadius="lg"
              onChange={handleLanguageChange}
              defaultValue={filterLanguage}
            >
              <option value="EN">English 🇺🇸</option>
              <option value="DE">German 🇦🇹</option>
            </Select>
          )}
        </HStack>
      </Collapse>
    </VStack>
  );
};

export default PostListControls;
