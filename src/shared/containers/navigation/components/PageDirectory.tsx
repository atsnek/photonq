import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionButtonProps,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  CenterProps,
  LinkProps
} from '@chakra-ui/react';
import { FC, Fragment, MouseEvent, createRef, useMemo, useState } from 'react';
import { NavMenuSection, NavMenuItem } from '../../../types/navigation';
import {
  convertPageTreeToMenu,
  getExpandedMenuItemIndices
} from '../../../utils/navigation';
import Link from '../../../components/Link';

const baseMenuItems: NavMenuSection[] = [
  {
    name: 'More',
    items: [
      {
        name: 'About Snek',
        href: '/docs/about-snek'
      },
      {
        name: 'Snek CLI',
        href: 'https://snek.at',
        isExternal: true
      }
    ]
  }
];

const baseMenuItemProps = {
  transition: 'opacity 0.2s ease-in-out, background-color 0.2s ease-in-out'
};

const inactiveMenuItemProps = {
  ...baseMenuItemProps,
  opacity: 0.8
};

const activeMenuItemProps = {
  ...baseMenuItemProps,
  opacity: 1,
  bgColor: 'theme.100',
  color: 'leftNav.accordion.activeItem.button.text.color',
  fontWeight: 'bold'
};

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
const generateMenuItem = (
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

  const styleProps: CenterProps & AccordionButtonProps & LinkProps = {
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
                  target instanceof SVGElement ||
                  target instanceof SVGPathElement;
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
              <AccordionButton
                {...(item.isActive
                  ? activeMenuItemProps
                  : inactiveMenuItemProps)}
                {...styleProps}
                borderRadius="md"
                py={1.5}
                backgroundColor={
                  item.isActive ? semanticPath + 'bgColor' : undefined
                }
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

interface PageDirectoryProps {
  data: ReturnType<typeof convertPageTreeToMenu>;
  isExpanded?: boolean;
  isMobile?: boolean;
  closeMobileDrawer?: () => void;
}
/**
 * The page directory component that shows the documentation structure.
 */
const PageDirectory: FC<PageDirectoryProps> = ({
  data,
  isExpanded = true,
  isMobile = false,
  closeMobileDrawer
}) => {
  // Calculate the default expanded indices for the accordion
  const defaultExpandedIdx = useMemo(() => {
    return data.menu ? getExpandedMenuItemIndices(data.menu) : [];
  }, [data.activeIdx]);

  // Keep track of the items that have been expanded by the user
  const [expandedIdx, setExpandedIdx] = useState<number[]>(defaultExpandedIdx);

  const updateExpandedIdx = (idx: number, mode: 'toggle' | 'set') => {
    const isIncluded = expandedIdx.includes(idx);
    if (mode === 'toggle' && isIncluded) {
      setExpandedIdx(expandedIdx.filter(i => i !== idx));
      return;
    }
    if (!isIncluded) setExpandedIdx([...expandedIdx, idx]);
  };

  let menuRootExpandedIdx = 0;
  return (
    <Accordion
      id="left-nav-accordion"
      visibility={isExpanded ? 'visible' : 'hidden'}
      opacity={isExpanded ? 1 : 0}
      w={isExpanded ? '100%' : 'max-content'}
      allowMultiple
      css={{
        // Remove border from last accordion item
        '& .chakra-accordion__item:last-child': {
          borderBottomWidth: 0
        }
      }}
      variant="leftNav"
      transition="opacity 0.2s ease-in-out, width 0.2s ease-in-out"
      mb={isMobile ? 12 : undefined}
      index={expandedIdx}
    >
      {[...data.menu, ...baseMenuItems].map((section, i) => (
        <Fragment key={i}>
          {section.name && (
            <Box
              key={0}
              mt={i === 0 ? 0 : 9}
              fontSize="sm"
              fontWeight="bold"
              ml={4}
            >
              {section.name}
            </Box>
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
    </Accordion>
  );
};

export default PageDirectory;
