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
  Tooltip,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react';
import { ChangeEvent, FC, useMemo, useRef, useState } from 'react';
import { TDebounceData } from '../../shared/types/comm';
import { TPostListData, TPostPreview } from './types/post';
import TbFilterDown from '../../shared/components/icons/tabler/TbFilterDown';
import TbFilterUp from '../../shared/components/icons/tabler/TbFilterUp';
import { wait } from '../../shared/utils/utils';
import TbPlus from '../../shared/components/icons/tabler/TbPlus';
import Link from '../../shared/components/Link';
import { sq } from '@snek-functions/origin';
import { formatPostDate } from '../../shared/utils/features/post';

interface IPostListControlsProps extends StackProps {
  fetchPosts: (query: string) => void;
  enableAdvancedSearch?: boolean;
  showCreatePostButton?: boolean;
  defaultQuery?: string;
  setQuery?: (query: string) => void;
}

const PostListControls: FC<IPostListControlsProps> = ({
  fetchPosts,
  enableAdvancedSearch = true,
  showCreatePostButton,
  defaultQuery,
  setQuery,
  ...props
}) => {
  const [activeSortOption, setActiveSortOption] =
    useState<(typeof sortOptions)[number]['value']>('recent');

  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const stateRef = useRef<TDebounceData>({
    state: 'inactive',
    timeout: undefined
  }); // Keep track of the current state of the search

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

  const sortMenuItems = useMemo(() => {
    return sortOptions.map((option, i) => {
      const isActive = option.value === activeSortOption;
      return (
        <MenuItem
          key={i}
          onClick={option.onClick}
          position={isActive ? 'relative' : undefined}
        >
          {option.label}
          {isActive && (
            <CheckIcon
              position="absolute"
              right={3}
              boxSize="10px"
              color="brand.500"
            />
          )}
        </MenuItem>
      );
    });
  }, [sortOptions, activeSortOption]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    if (setQuery) setQuery(query);

    clearTimeout(stateRef.current.timeout);
    stateRef.current.timeout = setTimeout(async () => {
      // if (!query.length) {
      // stateRef.current.state = 'inactive';
      // setPosts({ state: 'inactive', posts: [] });
      //   return;
      // }
      fetchPosts(query);
    }, 300);
  };

  // const fetchPosts = async (query: string): Promise<TPostPreview[]> => {
  //   const [rawPosts, errors] = await sq.query(q =>
  //     q.allSocialPost({ filters: { limit: 10, offset: 0 } })
  //   );

  //   if (errors?.length) return [];

  //   const posts: TPostPreview[] = rawPosts.map(post => ({
  //     id: post.id,
  //     title: post.title,
  //     summary: post.summary,
  //     createdAt: formatPostDate(post.createdAt),
  //     stars: post.stars?.length ?? 0,
  //     avatarUrl: post.avatarURL,
  //     profileId: post.profileId,
  //     privacy: post.privacy ?? 'private'
  //   }));

  //   return posts;
  // };

  return (
    <VStack w="full">
      <HStack spacing={3} w="75%" {...props}>
        <Input
          placeholder="Find a post..."
          size="sm"
          borderRadius="lg"
          defaultValue={defaultQuery}
          onChange={handleInputChange}
          focusBorderColor="theme.600"
          //! focusBorderColor - semantic token not working
          // focusBorderColor="components.input._focus.borderColor"
          // bgColor="components.input._focus.borderColor"
        />
        <Menu>
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
        </Menu>
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
        {showCreatePostButton && (
          <Tooltip openDelay={500} label="Create a new post">
            <IconButton
              as={Link}
              colorScheme="gray"
              size="sm"
              variant="outline"
              icon={<TbPlus />}
              aria-label="Create new post"
              href="/docs/community/new-post"
            />
          </Tooltip>
        )}
      </HStack>
      <Collapse
        in={isAdvancedSearchOpen}
        animateOpacity
        style={{ width: '75%' }}
      >
        <HStack gap={5} w="full">
          <InputGroup size="sm">
            <InputLeftAddon borderLeftRadius="lg">Date from</InputLeftAddon>
            <Input type="date" />
            <InputRightAddon>Date to</InputRightAddon>
            <Input type="date" sx={{ borderRightRadius: 'lg' }} />
          </InputGroup>
          <Select placeholder="Language" size="sm" borderRadius="lg">
            <option value="english">English 🇺🇸</option>
            <option value="german">German 🇦🇹</option>
          </Select>
        </HStack>
      </Collapse>
    </VStack>
  );
};

export default PostListControls;
