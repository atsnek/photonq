import React, { FC } from 'react';
import { LinkProps } from '@chakra-ui/react';
import { LinkData } from '../types/navigation';
import Link from './Link';

interface LinksProps {
  links: LinkData[];
  props: LinkProps;
  activeProps?: LinkProps;
}

const Links: FC<LinksProps> = ({ links, props, activeProps }) => {
  return (
    <>
      {links.map(link => {
        return (
          <Link
            key={link.name}
            href={link.href}
            {...props}
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
