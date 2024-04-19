import { useCMSManagementContext, useJaenPageIndex } from '@atsnek/jaen';
import { ListItem, OrderedList, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';

import ImageCard from '../../image-card/components/ImageCard';

const DocsIndex: React.FC<{
  type?: 'card' | 'toc';
}> = ({ type = 'card' }) => {
  const index = useJaenPageIndex({});

  const manager = useCMSManagementContext();

  if (type === 'toc') {
    return (
      <OrderedList marginInlineStart="2em">
        {index.childPages.map((child, index) => (
          <ListItem key={index} mb="2">
            <Link href={`/docs/${child.slug || 'none'}`} mb="2">
              {child.jaenPageMetadata?.title || 'Read Page'}
            </Link>{' '}
            <Text fontSize="sm" color="gray.600">
              {child.jaenPageMetadata?.description || ''}
            </Text>{' '}
          </ListItem>
        ))}
      </OrderedList>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing="4" gap="4">
      {index.childPages.map((child, index) => {
        return (
          <ImageCard
            key={index}
            id={child.id}
            link={{
              name: `${child.jaenPageMetadata?.title || 'Read Page'}`,
              href: manager.pagePath(child.id)
            }}
            image={{
              src: child.jaenPageMetadata?.image || '',
              alt: child.jaenPageMetadata?.description || ''
            }}
            baseProps={{ mt: 0 }}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default DocsIndex;
