import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import React, { FC, useEffect, useMemo } from 'react';
import { useJaenPageTree } from '@snek-at/jaen';
import { useLocation } from '@reach/router';
import { TAdjacentPages, TLinkData } from '../../types/navigation';
import {
  convertPageTreeToMenu,
  buildActiveMenuItemIndexArray,
  getAdjacentPages
} from '../../utils/navigation';
import Link from '../../components/Link';

interface MainBottomNavProps {
  previousPage?: TLinkData;
  nextPage?: TLinkData;
}

const props = {
  display: 'flex',
  alignItems: 'center',
  opacity: 0.7,
  _hover: {
    color: 'main.bottomNav.linkHoverColor',
    opacity: 1
  }
};

/**
 * Main bottom navigation component.
 * This shows links to the respective previous and next page.
 */
const MainBottomNav: FC<MainBottomNavProps> = ({}) => {
  const pageTree = useJaenPageTree();

  const location = useLocation();

  // Memoized adjacent pages object to navigate to previous and next page.
  const pages: TAdjacentPages = useMemo(() => {
    const menu = convertPageTreeToMenu(pageTree, location.pathname).menu;
    const idxArr = buildActiveMenuItemIndexArray(menu);
    return getAdjacentPages(idxArr, menu);
  }, [pageTree]);

  return (
    <Flex
      borderTop="1px solid"
      borderColor="components.separator.borderColor"
      mt={10}
      pt={5}
      pb="8px" // This is to make the nav controls align with the bottom of this nav
    >
      {pages.prev && (
        <Link href={pages.prev.href} {...props}>
          <ChevronLeftIcon mr={2} />
          <Text as="span" verticalAlign="middle">
            {pages.prev.name}
          </Text>
        </Link>
      )}
      <Spacer minW={10} />
      {pages.next && (
        <Link href={pages.next.href} {...props} textAlign="right">
          <Text as="span" verticalAlign="middle">
            {pages.next.name}
          </Text>
          <ChevronRightIcon ml={2} />
        </Link>
      )}
    </Flex>
  );
};

export default MainBottomNav;
