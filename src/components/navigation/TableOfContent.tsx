import { VStack } from '@chakra-ui/react';
import { FC } from 'react';
import useTocNavigation from '../../hooks/use-toc-navigation';

import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';
import { Link } from 'gatsby-plugin-jaen';
import { useTOCContext } from '../../contexts/toc';

interface ITableOfContentProps {
  mdxFieldName?: string;
  fieldContent?: MdastRoot;
}

/**
 * Component for the table of content.
 */
const TableOfContent: FC<ITableOfContentProps> = ({
  mdxFieldName,
  fieldContent
}) => {
  const toc = useTOCContext();

  console.log('TOC', toc);

  const data = useTocNavigation(
    mdxFieldName ? mdxFieldName : toc.value ? undefined : 'documentation',
    !mdxFieldName ? toc.value : undefined
  );

  return (
    <VStack spacing={2} fontSize="sm">
      {data.map(item => {
        const isActive = false; //TODO: implement active state
        return (
          <Link
            key={item.id}
            to={'#' + item.id}
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
