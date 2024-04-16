import {
  List as ChList,
  UnorderedList,
  OrderedList,
  ListItem
} from '@chakra-ui/react';
import { ComponentType, FC, ReactNode } from 'react';
import { IMainContentComponentBaseProps } from '../../types/mainContent';

export type ListItem = {
  text: string;
  children?: ListItem[];
};

export interface IListProps extends IMainContentComponentBaseProps {
  variant?: 'unordered' | 'ordered';
  children: ReactNode;
}

/**
 * Component for displaying lists.
 */
const List: FC<IListProps> = ({
  baseProps,
  variant = 'unordered',
  children
}) => {
  let ListComp: typeof UnorderedList | typeof OrderedList = UnorderedList;
  if (variant === 'ordered') ListComp = OrderedList;

  return <ListComp {...baseProps}>{children}</ListComp>;
};

export default List;
