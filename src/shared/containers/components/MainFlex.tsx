import { FlexProps, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavOffset } from '../../hooks/use-nav-offset';
import { mainContentWrapperProps } from '../../vars/layout';

interface IMainFlexProps extends FlexProps {}

/**
 * Main flex for two-column based content of.
 */
const MainFlex: FC<IMainFlexProps> = ({ children, ...props }) => {
  const navOffset = useNavOffset();

  return (
    <Flex
      flex={1}
      mt={5}
      h={`max(mac-content, calc(100vh - ${navOffset}))`}
      mx="auto"
      maxW={mainContentWrapperProps.default.maxW}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default MainFlex;
