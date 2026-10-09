import {
  ArrowForwardIcon,
  ChevronDownIcon
} from '../../../../components/icons/chakra';
import {
  Accordion,
  AccordionItemTriggerProps,
  Box,
  Center,
  CenterProps,
  LinkProps
} from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';
import { MouseEvent, createRef } from 'react';
import { NavMenuItem } from '../../../../utils/navigation/types';
import {
  activeMenuItemProps,
  inactiveMenuItemProps
} from '../vars/pageDirectory';

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

  const externalLinkIcon = (
    <ArrowForwardIcon transform={`rotate(-45deg)`} ml={2} />
  );

  const styleProps: CenterProps & AccordionItemTriggerProps & LinkProps = {
    _hover: { opacity: 1 }
  };
  if (item.isActive)
    styleProps.backgroundColor = 'leftNav.accordion.activeItem.bgColor';
  else if (styleProps._hover)
    styleProps._hover.backgroundColor =
      'leftNav.accordion.inactiveItem.hoverBgColor';

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
    const semanticPath = `leftNav.accordion.${
      item.isActive ? '' : 'in'
    }activeItem.`;
    resultObj.item = (
      <Accordion.Item
        ref={accordionItemRef}
        key={item.href + item.name}
        // v2 kept href+name as the item's DOM id and expanded items by their
        // numeric position. v3 expands by value, so the value has to carry that
        // same position, which is what PageDirectory holds in its state.
        value={String(expandedIdx)}
        css={{
          // Remove padding from last accordion item. v3 moved the panel's
          // padding from the panel itself onto the body slot inside it.
          '& .chakra-accordion__itemBody': {
            paddingBottom: 0
          }
        }}
        my={1}
        // This is a hack to remove the bottom border from the last accordion item
        borderBottomWidth="0 !important"
      >
        <Link
          to={item.href}
          onClick={(e: MouseEvent<HTMLAnchorElement>) => {
            const target = e.target as HTMLElement;
            const hasClickedOnArrow =
              target instanceof SVGElement || target instanceof SVGPathElement;
            updateExpandedIdx(
              expandedIdx,
              hasClickedOnArrow ? 'toggle' : 'set'
            );
            linkClickHandler(e);
            if (!hasClickedOnArrow && closeMobileDrawer) {
              closeMobileDrawer();
            }
          }}
        >
          <Accordion.ItemTrigger
            {...(item.isActive ? activeMenuItemProps : inactiveMenuItemProps)}
            {...styleProps}
            borderRadius="md"
            py={1.5}
            backgroundColor={
              item.isActive ? semanticPath + 'bgColor' : undefined
            }
          >
            {/* Lines break at spaces. `break-all` broke every line at the
                last character that fit, mid-word ("Quantu|m Information",
                "Learn about Op|enQASM"). `anywhere` still breaks a single
                word that is wider than the column. */}
            <Box as="span" flex="1" overflowWrap="anywhere">
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
              <Accordion.ItemIndicator
                className="prv-link"
                opacity="inherit"
                // Driven by the item's own accordion state, so the arrow can
                // never disagree with the panel below it. v2 read that state
                // from the item's render prop, v3 exposes it as data-state.
                transform="rotate(-90deg)"
                // v3's base recipe turns the open indicator with the CSS
                // `rotate` property, which composes with `transform` rather
                // than replacing it, so it has to be pinned back to zero for
                // the arrow to land where v2 put it.
                _open={{ transform: 'rotate(0deg)', rotate: '0deg' }}
                // v2's AccordionIcon carried its own `transform 0.2s`, so the
                // turn has to be declared here to keep it.
                transition="transform 0.2s ease-in-out"
              >
                {/* v2's AccordionIcon was Chakra v2's own ChevronDown at
                    `fontSize: 1.25em`, which is the glyph vendored into
                    icons/chakra. An ItemIndicator with no children falls back
                    to v3's built-in chevron instead, a different path that
                    renders a visibly different arrow at this size. */}
                <ChevronDownIcon boxSize="1.25em" />
              </Accordion.ItemIndicator>
            </Center>
          </Accordion.ItemTrigger>
        </Link>
        <Accordion.ItemContent position="relative">
          <Accordion.ItemBody>
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
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    );
  } else {
    resultObj.item = (
      <Link
        {...(item.isActive ? activeMenuItemProps : inactiveMenuItemProps)}
        {...styleProps}
        key={item.href + item.name}
        to={item.href}
        // `isExternal` is gone from here: jaen's Link decides externality from
        // `to` itself and sets target and rel accordingly. Its props are
        // widened to `any`, so passing it would still type-check and would
        // simply be spread onto the anchor as an unknown DOM attribute.
        // `item.isExternal` is still what draws the arrow glyph below.
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
