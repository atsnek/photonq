import { FC, ReactNode } from 'react';
import { VStack } from '@chakra-ui/react';
import { useTocNavigation } from '../../../hooks/use-toc-navigation';
import { TableOfContentItem } from '../../../types/navigation';
import Link from '../../../components/Link';

/**
 * Component for the table of content.
 */
const TableOfContent: FC = ({}) => {
  const data = useTocNavigation('documentation');

  return (
    <VStack spacing={2}>
      {data.map((item: TableOfContentItem) => {
        const isActive = false; //TODO: implement active state
        return (
          <Link
            key={item.id}
            href={'#' + item.id}
            display="block"
            w="full"
            paddingLeft={(item.level - 1) * 4}
            opacity={isActive ? 1 : 0.7}
            color={`rightNav.link.${isActive ? 'active' : 'inactive'}.color`}
            fontWeight={isActive || item.level === 1 ? 'semibold' : 'normal'}
            _hover={{
              textDecoration: 'none',
              opacity: 1
            }}
            transition="opacity 0.1s ease-in-out"
          >
            {item.text}
          </Link>
        );
      })}
    </VStack>
  );
};

export default TableOfContent;
