import { ReactNode } from 'react';

export type TLinkData = {
  name: ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
};
