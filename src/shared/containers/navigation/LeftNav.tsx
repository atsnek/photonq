import { Flex, FlexProps, Spacer } from '@chakra-ui/react';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import MainBottomNav from './MainBottomNav';
import NavbarControls from './components/NavbarControls';
import { useNavOffset } from '../../hooks/use-nav-offset';

export interface ILeftNavProps extends FlexProps {
  isExpanded?: boolean;
  setIsExpanded?: Dispatch<SetStateAction<boolean>>;
  hideControls?: boolean;
  children?: ReactNode;
}

/**
 * Left navigation bar.
 */
const LeftNav: FC<ILeftNavProps> = ({
  isExpanded,
  setIsExpanded,
  hideControls,
  children,
  ...props
}) => {
  const navTopOffset = useNavOffset();
  return (
    <Flex
      position="sticky"
      top={`calc(70px + ${navTopOffset})`}
      as="nav"
      fontSize="sm"
      flexDirection="column"
      h={`calc(100vh - 100px - ${navTopOffset})`}
      w={isExpanded ? 'auto' : '5rem'}
      color="shared.text.default"
      {...props}
    >
      {children}
      <Spacer />
      {!hideControls && (
        <NavbarControls isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      )}
    </Flex>
  );
};

export default LeftNav;
