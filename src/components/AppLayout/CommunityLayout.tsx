import { Box, Container } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import useNavOffset from '../../hooks/use-nav-offset';

interface ICommunityLayoutProps {
  children: ReactNode;
}

/**
 *  The community layout component.
 */
const CommunityLayout: FC<ICommunityLayoutProps> = ({ children }) => {
  const offset = useNavOffset();

  return (
    <Container maxW="3xl" mt={offset}>
      {children}
    </Container>
  );
};

export default CommunityLayout;
