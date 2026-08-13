import {
  Collapsible,
  Group,
  HStack,
  IconButton,
  Input,
  InputAddon,
  Menu,
  Button,
  NativeSelect,
  StackProps,
  VStack
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
import { useAuth } from 'jaen';

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
  const isAuthenticated = useAuth().user !== null;
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
      <HStack gap={3} w="full" {...props}>
        {/* `onValueChange` is not an Input prop — the codemod renamed the
            handler and the debounce stopped firing. v3's Input is still a plain
            <input> with `onChange`.

            `focusBorderColor` is gone with no rename; v3 paints the focus ring
            from `--focus-ring-color`, which `focusRingColor` sets. */}
        <Input
          flex="1"
          placeholder="Find a experiment..."
          size="sm"
          borderRadius="lg"
          defaultValue={defaultQuery}
          onChange={handleInputChange}
          focusRingColor="theme.600"
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
            colorPalette="gray"
            size="sm"
            variant="outline"
            aria-label={'Toggle advanced search filter visibility'}
            onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
          >
            {isAdvancedSearchOpen ? <TbFilterDown /> : <TbFilterUp />}
          </IconButton>
        )}
        {showCreatePostButton && isAuthenticated && (
          <Button aria-label="New experiment" size="sm" asChild>
            <Link href="/new/experiment">
              <TbPlus />
              New
            </Link>
          </Button>
        )}
      </HStack>
      <Collapsible.Root open={isAdvancedSearchOpen} style={{ width: '75%' }}>
        <Collapsible.Content>
          <HStack gap={5} w="full">
            {!!setDateRange && (
              // v3's InputGroup clones a SINGLE child (React.Children.only), so
              // it cannot hold two addons and two inputs the way v2's did — it
              // throws. `Group attached` is the part that does what this markup
              // used v2's InputGroup for: it squares off the inner corners and
              // pulls the borders together with the same -1px, which is exactly
              // the border radii v2's InputGroup cloned onto its children.
              // v2's InputGroup also pushed its `size` down to every child;
              // Group does not, so each child names its own.
              <Group attached w="full">
                <InputAddon size="sm" borderLeftRadius="lg">
                  Date from
                </InputAddon>
                <Input
                  ref={dateFromRef}
                  size="sm"
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
                    setDateRange(
                      isNaN(date.getTime()) ? undefined : date,
                      dateTo
                    );
                  }}
                />
                <InputAddon size="sm">Date to</InputAddon>
                <Input
                  ref={dateToRef}
                  size="sm"
                  type="date"
                  css={{
                    borderRightRadius: 'lg'
                  }}
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
              </Group>
            )}
            {!!setFilterLanguage && (
              // `size` is a NativeSelect.Root recipe variant and is explicitly
              // omitted from NativeSelect.Field's props, so the codemod's
              // placement neither typed nor rendered. `onChange` for the same
              // reason as the inputs above: the field is a real <select>.
              <NativeSelect.Root size="sm">
                <NativeSelect.Field
                  placeholder="Language"
                  borderRadius="lg"
                  onChange={handleLanguageChange}
                  defaultValue={filterLanguage}
                >
                  <option value="EN">English 🇺🇸</option>
                  <option value="DE">German 🇦🇹</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            )}
          </HStack>
        </Collapsible.Content>
      </Collapsible.Root>
    </VStack>
  );
};

export default PostListControls;
