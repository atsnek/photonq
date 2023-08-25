import { ReactNode } from 'react';

export type NavMenuItem = {
  name: string;
  href: string;
  isExternal?: boolean;
  isActive?: boolean;
  hasActiveChild?: boolean;
  children?: NavMenuItem[];
  isSection?: boolean;
};

export type NavMenuSection = {
  name?: string;
  items: NavMenuItem[];
};

export type TLinkData = {
  name: ReactNode;
  href: string;
  isActive?: boolean;
};

export type TTopNavLinkData = TLinkData & {
  matchMethod: 'exact' | 'includes';
};

export type TableOfContentItem = {
  id: string;
  level: number;
  text: string;
};

export type MainBreadcrumbPart = {
  name: string;
  href: string;
  isDisabled?: boolean;
  isActive?: boolean;
} & (
    {
      isUser: true;
      showUserImage?: boolean;
    } | {
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
