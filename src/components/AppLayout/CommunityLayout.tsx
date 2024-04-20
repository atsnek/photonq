import { Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface ICommunityLayoutProps {
  children: ReactNode;
}

/**
 *  The community layout component.
 */
const CommunityLayout: FC<ICommunityLayoutProps> = ({ children }) => {
  return <Box mt={5}>{children}</Box>;
};

export default CommunityLayout;
