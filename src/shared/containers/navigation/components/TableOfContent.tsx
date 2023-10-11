import { FC } from 'react';
import { VStack } from '@chakra-ui/react';
import { useTocNavigation } from '../../../hooks/use-toc-navigation';
import { TableOfContentItem } from '../../../types/navigation';
import Link from '../../../components/Link';
import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';

interface ITableOfContentProps {
  mdxFieldName?: string;
  fieldContent?: MdastRoot;
}

/**
 * Component for the table of content.
 */
const TableOfContent: FC<ITableOfContentProps> = ({ mdxFieldName, fieldContent }) => {
  const data = useTocNavigation(
    mdxFieldName ? mdxFieldName : fieldContent ? undefined : 'documentation',
    !mdxFieldName ? fieldContent : undefined
  );

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
              opacity: 1,
              color: 'rightNav.link.active.color'
            }}
            transition="opacity 0.1s ease-in-out, color 0.1s ease-in-out"
          >
            {item.text}
          </Link>
        );
      })}
    </VStack>
  );
};

export default TableOfContent;
