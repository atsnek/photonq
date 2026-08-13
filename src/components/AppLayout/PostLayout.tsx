import { Box, Container } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import useNavOffset from '../../hooks/use-nav-offset';
import { TOCProvider } from '../../contexts/toc';
import TableOfContent from '../navigation/TableOfContent';

interface IPostLayoutProps {
  children: ReactNode;
}

/**
 *  The Post layout component.
 */
const PostLayout: FC<IPostLayoutProps> = ({ children }) => {
  const offset = useNavOffset();

  return (
    <Container maxW="8xl" pos="relative">
      <TOCProvider>
        <Container maxW="3xl" mt={offset} py="8" minH="100vh">
          {children}
        </Container>

        <Box
          as="aside"
          pos="fixed"
          top={120}
          right={{
            base: '0',
            xl: 'calc((100% - 1280px) / 2)'
          }}
          display={{
            base: 'none',
            xl: 'block'
          }}
          w="200px"
        >
          <TableOfContent />
        </Box>
      </TOCProvider>
    </Container>
  );
};

export default PostLayout;
