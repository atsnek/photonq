import { useCMSManagementContext, useJaenPageIndex } from 'jaen';
import { ListItem, OrderedList, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';

import ImageCard from '../../image-card/components/ImageCard';

const DocsIndex: React.FC<{
  type?: 'card' | 'toc';
}> = ({ type = 'card' }) => {
  const index = useJaenPageIndex({});

  const manager = useCMSManagementContext();

  const prioritiesIds = [
    'JaenPage 15c1e248-83da-4642-adb5-dff5414fe330',
    'JaenPage 2d808d41-27fe-436e-be2d-9901a7596eb6',
    'JaenPage 23ceeff3-dd19-43b7-9c65-1c774c391b9d',
    'JaenPage 969775d8-b434-4e14-85ab-d27b385cb90c'
  ];

  const pages: typeof index.childPages = [];

  for (const id of prioritiesIds) {
    const page = index.childPages.find(page => page.id === id);

    if (page) {
      pages.push(page);
    }
  }

  // Add the rest of the pages
  for (const page of index.childPages) {
    if (!prioritiesIds.includes(page.id)) {
      pages.push(page);
    }
  }

  if (type === 'toc') {
    return (
      <OrderedList marginInlineStart="2em">
        {pages.map((child, index) => (
          <ListItem key={index} mb="2">
            <Link to={manager.pagePath(child.id)} mb="2">
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
      {pages.map((child, index) => {
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
