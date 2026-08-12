import { List as ChList } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
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
  const isOrdered = variant === 'ordered';

  // v2's UnorderedList and OrderedList were thin wrappers over List that set
  // exactly these three props, so spelling them out here keeps the markup and
  // the indent identical. baseProps stays last, as it was when it was spread
  // onto the wrapper.
  return (
    <ChList.Root
      as={isOrdered ? 'ol' : 'ul'}
      listStyleType={isOrdered ? 'decimal' : 'initial'}
      marginStart="1em"
      {...baseProps}
    >
      {children}
    </ChList.Root>
  );
};

export default List;
