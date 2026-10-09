import { useAuth } from 'jaen';
import {
  Accordion,
  Box,
  HStack,
  StackProps,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import { FC, Fragment, useMemo, useState } from 'react';
import {
  createPageTree,
  getExpandedMenuItemIndices
} from '../../../utils/navigation';
import { NavMenuItem, NavMenuSection } from '../../../utils/navigation/types';
import TbUsers from '../../icons/tabler/TbUsers';
import { generateMenuItem } from './utils/pageDirectory';

interface PageDirectoryProps {
  data: ReturnType<typeof createPageTree>;
  baseMenuItems?: NavMenuSection[];
  isExpanded?: boolean;
  isMobile?: boolean;
  closeMobileDrawer?: () => void;
  path?: string;
}
/**
 * The page directory component that shows the documentation structure.
 */
const PageDirectory: FC<PageDirectoryProps> = ({
  data,
  baseMenuItems = [],
  isExpanded = true,
  isMobile = false,
  closeMobileDrawer,
  path
}) => {
  // Calculate the default expanded indices for the accordion
  const defaultExpandedIdx = useMemo(() => {
    return data.menu ? getExpandedMenuItemIndices(data.menu) : [];
  }, [data.activeIdx]);

  // Keep track of the items that have been expanded by the user
  const [expandedIdx, setExpandedIdx] = useState<number[]>(defaultExpandedIdx);
  const { isAuthenticated, signinRedirect } = useAuth();
  // v2 was handed the string 'false', which is not a breakpoint name, so no
  // fallback ever matched and the pre-hydration value came back undefined. v3
  // types the option and resolves an unmatched name to the widest breakpoint in
  // the map, so 'md' is what reproduces that same falsy first render.
  const isSmallScreen = useBreakpointValue(
    { base: true, md: false },
    { fallback: 'md' }
  );

  const updateExpandedIdx = (idx: number, mode: 'toggle' | 'set') => {
    const isIncluded = expandedIdx.includes(idx);
    if (mode === 'toggle' && isIncluded) {
      setExpandedIdx(expandedIdx.filter(i => i !== idx));
      return;
    }
    if (!isIncluded) setExpandedIdx([...expandedIdx, idx]);
  };

  /**
   * The sections under the docs tree, built anew on every render.
   *
   * The "Navigation" section used to be pushed into the `baseMenuItems` prop
   * itself. The callers build that array in their own render, but this
   * component also re-renders on its own whenever `useBreakpointValue` flips,
   * and then it is handed the same, already mutated array. A "Sign In" entry
   * added while the viewport was narrow therefore stayed in the desktop nav
   * after a resize or a tablet rotation, and every further narrow render added
   * another one. The order is the old one: Sign In first, then Documentation.
   */
  const navigationItems: NavMenuItem[] = [];

  if (isSmallScreen && !isAuthenticated) {
    navigationItems.push({ name: 'Sign In', onClick: signinRedirect });
  }

  if (path === '/') {
    navigationItems.push({ name: 'Documentation', href: '/docs' });
  }

  const menuSections: NavMenuSection[] = navigationItems.length
    ? [{ name: 'Navigation', items: navigationItems }, ...baseMenuItems]
    : baseMenuItems;

  let menuRootExpandedIdx = 0;

  return (
    <Accordion.Root
      id="left-nav-accordion"
      visibility={isExpanded ? 'visible' : 'hidden'}
      opacity={isExpanded ? 1 : 0}
      w={isExpanded ? '100%' : 'max-content'}
      multiple
      css={{
        // Remove border from last accordion item
        '& .chakra-accordion__item:last-child': {
          borderBottomWidth: 0
        }
      }}
      // leftNav comes from the site's accordion slot recipe, and it type-checks
      // without an assertion: `chakra typegen` runs on postinstall and writes
      // the recipe's own variant names into node_modules.
      variant="leftNav"
      transition="opacity 0.2s ease-in-out, width 0.2s ease-in-out"
      mb={isMobile ? 12 : undefined}
      // v2 drove the accordion by numeric `index`. v3 drives it by item value,
      // so the same numbering is carried across as strings and every item
      // stringifies the index it was handed in generateMenuItem.
      value={expandedIdx.map(String)}
    >
      {[...data.menu, ...menuSections].map((section, i) => (
        <Fragment key={i}>
          {section.name && (
            <HStack
              key={0}
              gap={2}
              ml={4}
              mt={i === 0 ? 0 : 9}
              fontSize="sm"
              fontWeight="bold"
              // NavMenuSection.styling is a BoxProps, where `direction` is the
              // CSS writing direction; Stack narrows the same name to a flex
              // direction. No section supplies either, so the assertion only
              // bridges the two spellings of one prop name.
              {...(section.styling as StackProps)}
              color="components.pageDirectory.section.title.color"
              opacity={1}
            >
              <Text>{section.name}</Text>
              {section.icon}
            </HStack>
          )}
          <Box key={1}>
            {section.items?.map((item: NavMenuItem) => {
              const res = generateMenuItem(
                item,
                isMobile,
                updateExpandedIdx,
                menuRootExpandedIdx,
                closeMobileDrawer
              );
              menuRootExpandedIdx = res.idx++;
              return res.item;
            })}
          </Box>
        </Fragment>
      ))}
    </Accordion.Root>
  );
};

export default PageDirectory;
