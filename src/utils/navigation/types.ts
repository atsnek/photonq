import { ReactNode } from 'react';
import { BoxProps, LinkProps } from '@chakra-ui/react';

export type NavMenuItem = {
  name: string;
  href?: string;
  onClick?: () => void;
  isExternal?: boolean;
  isActive?: boolean;
  hasActiveChild?: boolean;
  children?: NavMenuItem[];
  isSection?: boolean;
};

export type NavMenuSection = {
  name?: string;
  items: NavMenuItem[];
  styling?: BoxProps;
  icon?: ReactNode;
};

export type TLinkData = {
  name: ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
};

export type TTopNavLinkData = TLinkData & {
  matchMethod: 'exact' | 'includes';
  style?: LinkProps;
};

export type MainBreadcrumbPart = {
  name: string;
  href: string;
  isDisabled?: boolean;
  isActive?: boolean;
} & (
  | {
      isUser: true;
      user: any | null;
      showUserImage?: boolean;
    }
  | {
      isUser?: false;
    }
);

/**
 * Stores the data of the previous and next page
 */
export type TAdjacentPages = {
  prev?: TLinkData;
  next?: TLinkData;
};

export type TMenuStructure = {
  menu: NavMenuSection[];
  activeIdx: number[];
};
