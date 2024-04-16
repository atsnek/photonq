import React, { FC } from 'react';
import { LinkProps } from '@chakra-ui/react';
import Link from './Link';
import { TLinkData } from '../types/navigation';

interface LinksProps {
  links: Array<TLinkData & { style?: LinkProps }>;
  props: LinkProps;
  activeProps?: LinkProps;
}

const Links: FC<LinksProps> = ({ links, props, activeProps }) => {
  return (
    <>
      {links.map((link, i) => {
        return (
          <Link
            key={i}
            href={link.href}
            onClick={link.onClick}
            {...props}
            {...link.style}
            {...(link.isActive ? activeProps : {})}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
};

/**
 * Memoized links component.
 * This is used to memoize the links component so that it doesn't re-render
 * @param links  The links to render
 * @param props  The props to pass to each Chakra-Link
 */
const MemoizedLinks = React.memo(Links, () => false);

export default MemoizedLinks;
