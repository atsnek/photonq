import { LinkProps } from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';
import { FC } from 'react';
import { TLinkData } from './types';

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
            to={link.href}
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

export default Links;
