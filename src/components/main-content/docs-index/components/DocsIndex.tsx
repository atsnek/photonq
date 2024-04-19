import { useContentManagement, useJaenPageIndex } from '@atsnek/jaen';
import { Box, SimpleGrid } from '@chakra-ui/react';
import ImageCard from '../../image-card/components/ImageCard';
import { useCMSManagement } from 'gatsby-plugin-jaen/src/connectors/cms-management';

const DocsIndex: React.FC = () => {
  const index = useJaenPageIndex({});

  const manager = useCMSManagement();

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
