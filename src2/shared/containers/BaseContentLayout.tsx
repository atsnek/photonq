import { Container } from '@chakra-ui/react';
import { FC } from 'react';
import { mainContentWrapperProps } from '../vars/layout';

interface IBaseContentLayoutProps {
  children?: React.ReactNode;
}

/**
 * The base layout for all content pages that require no special layout setup.
 */
const BaseContentLayout: FC<IBaseContentLayoutProps> = ({ children }) => {
  return (
    <Container maxW={mainContentWrapperProps.default.maxW} my={10}>
      {children}
    </Container>
  );
};

export default BaseContentLayout;
