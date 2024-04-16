import { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { useNavOffset } from '../../hooks/use-nav-offset';

interface IRightNavProps {
  children?: ReactNode;
}

/**
 * Right navigation bar.
 */
const RightNav: FC<IRightNavProps> = ({ children }) => {
  const navTopOffset = useNavOffset();

  return (
    <Box
      position="sticky"
      top={`calc(70px + ${navTopOffset})`}
      as="aside"
      display={{ base: 'none', xl: 'block' }}
      color="shared.text.default"
      fontSize="sm"
    >
      {children}
    </Box>
  );
};

export default RightNav;
