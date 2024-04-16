import { useJaenPageIndex } from '@atsnek/jaen';
import { Box, SimpleGrid } from '@chakra-ui/react';
import ImageCard from '../../image-card/components/ImageCard';

const DocsIndex: React.FC = () => {
  type?: 'card' | 'toc';
}> = ({ type = 'card' }) => {
  const index = useJaenPageIndex({});

  console.log('index', index);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing="4" gap="4">
      {index.childPages.map((child, index) => {
        return (
          <ImageCard
            key={index}
            id={child.id}
            link={{
              name: `${child.jaenPageMetadata?.title || 'Read Page'}`,
              href: `/docs/${child.slug || 'none'}`
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
