import { ListItem as ChListItem } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface IListItemProps {
  children: ReactNode;
}
/**
 * Component for displaying a single list item.
 */
const ListItem: FC<IListItemProps> = ({ children }) => {
  return <ChListItem>{children}</ChListItem>;
};

export default ListItem;
