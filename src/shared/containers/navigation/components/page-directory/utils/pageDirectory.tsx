import { MouseEvent } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  CenterProps,
  AccordionButtonProps,
  AccordionItem,
  AccordionButton,
  Center,
  AccordionIcon,
  AccordionPanel,
  LinkProps,
  Box
} from '@chakra-ui/react';
import { createRef } from 'react';
import { NavMenuItem } from '../../../../../types/navigation';
import { activeMenuItemProps, inactiveMenuItemProps } from '../vars/pageDirectory';
import Link from '../../../../../components/Link';

/**
 * Handles clicks on links in the main navigation menu. If the target is not an anchor element, the default action is prevented, which prevents the page from reloading.
 * @param ev  The click event that triggered the handler
 */
const linkClickHandler = (ev: MouseEvent<HTMLAnchorElement>) => {
  if (
    ev.target instanceof HTMLAnchorElement ||
    ev.target instanceof HTMLButtonElement ||
    ev.target instanceof HTMLSpanElement
  )
    return;
  ev.preventDefault();
};

/**
 * Generates a menu item for the main navigation menu.
 * @param item  The menu item to generate
 * @param isMobile  Whether or not the menu is being generated for mobile. If true, sections will be included.
 * @param closeMobileDrawer  A function to close the mobile drawer. Only required if isMobile is true.
 * @returns
 */
export const generateMenuItem = (
  item: NavMenuItem,
  isMobile: boolean,
  updateExpandedIdx: (idx: number, mode: 'toggle' | 'set') => void,
  expandedIdx: number,
  closeMobileDrawer?: () => void
) => {
  if (!isMobile && item.isSection) return { idx: expandedIdx };

  const accordionItemRef = createRef<HTMLDivElement>();

  const externalLinkIcon = <ArrowForwardIcon transform={`rotate(-45deg)`} ml={2} />;

  const styleProps: CenterProps & AccordionButtonProps & LinkProps = {
    _hover: { opacity: 1 }
  };
  if (item.isActive) styleProps.backgroundColor = 'leftNav.accordion.activeItem.bgColor';
  else if (styleProps._hover)
    styleProps._hover.backgroundColor = 'leftNav.accordion.inactiveItem.hoverBgColor';

  // Check if the item has children and is not a section (except on mobile)
  const hasChildren =
    item.children &&
    item.children.length > 0 &&
    (isMobile || item.children.some(child => !child.isSection));

  const resultObj: { idx: number; item?: JSX.Element | JSX.Element[] } = {
    idx: expandedIdx
  };

  if (hasChildren) {
    resultObj.idx++;
    const children = item.children?.map(child => {
      const res = generateMenuItem(
        child,
        isMobile,
        updateExpandedIdx,
        resultObj.idx,
        closeMobileDrawer
      );
      resultObj.idx = res.idx;
      return res;
    });
    const semanticPath = `leftNav.accordion.${item.isActive ? '' : 'in'}activeItem.`;
    resultObj.item = (
      <AccordionItem
        ref={accordionItemRef}
        key={item.href + item.name}
        id={item.href + item.name}
        css={{
          // Remove padding from last accordion item
          '& .chakra-accordion__panel': {
            paddingBottom: 0
          }
        }}
        my={1}
        // This is a hack to remove the bottom border from the last accordion item
        borderBottomWidth="0 !important"
      >
        {({ isExpanded }) => (
          <>
            <Link
              href={item.href}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                const target = e.target as HTMLElement;
                const hasClickedOnArrow =
                  target instanceof SVGElement || target instanceof SVGPathElement;
                updateExpandedIdx(expandedIdx, hasClickedOnArrow ? 'toggle' : 'set');
                linkClickHandler(e);
                if (!hasClickedOnArrow && closeMobileDrawer) {
                  closeMobileDrawer();
                }
              }}
            >
              <AccordionButton
                {...(item.isActive ? activeMenuItemProps : inactiveMenuItemProps)}
                {...styleProps}
                borderRadius="md"
                py={1.5}
                backgroundColor={item.isActive ? semanticPath + 'bgColor' : undefined}
              >
                <Box as="span" flex="1" wordBreak="break-all">
                  {item.name}
                  {item.isExternal && externalLinkIcon}
                </Box>
                <Center
                  {...styleProps}
                  as="span"
                  borderRadius="sm"
                  transition="background-color 0.2s ease-in-out"
                  backgroundColor="transparent"
                  _hover={{
                    bgColor: semanticPath + 'button.icon.hoverContainerBgColor'
                  }}
                >
                  <AccordionIcon
                    className="prv-link"
                    opacity="inherit"
                    transform={`rotate(${isExpanded ? 0 : -90}deg)`}
                  />
                </Center>
              </AccordionButton>
            </Link>
            <AccordionPanel position="relative">
              <Box
                _before={{
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 2,
                  borderRadius: 'full',
                  left: '10px',
                  width: '1px',
                  height: 'calc(100% - 0.5rem)',
                  backgroundColor: 'leftNav.accordion.panel.borderLeftColor'
                }}
              >
                {children?.map(child => child.item)}
              </Box>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    );
  } else {
    resultObj.item = (
      <Link
        {...(item.isActive ? activeMenuItemProps : inactiveMenuItemProps)}
        {...styleProps}
        key={item.href + item.name}
        href={item.href}
        isExternal={item.isExternal}
        display="block"
        py={1.5}
        px={4}
        mt={1}
        cursor="pointer"
        borderRadius="md"
        onClick={closeMobileDrawer}
        onClickCapture={item.onClick}
      >
        {item.isSection && (
          <Box key={-5} as="span" mr={2} fontSize="sm" color="gray.400">
            #
          </Box>
        )}
        {item.name}
        {item.isExternal && externalLinkIcon}
      </Link>
    );
  }
  return resultObj;
};
