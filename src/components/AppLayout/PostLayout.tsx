import { Box, Container } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import useNavOffset from '../../hooks/use-nav-offset';
import { TOCProvider } from '../../contexts/toc';

interface IPostLayoutProps {
  children: ReactNode;
}

/**
 *  The Post layout component.
 */
const PostLayout: FC<IPostLayoutProps> = ({ children }) => {
  const offset = useNavOffset();

  return (
    <Container maxW="3xl" mt={offset} py="8">
      <TOCProvider>{children}</TOCProvider>
    </Container>
  );
};

export default PostLayout;
