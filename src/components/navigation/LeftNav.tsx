import { Flex, FlexProps, Spacer, Stack } from '@chakra-ui/react';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import useNavOffset from '../../hooks/use-nav-offset';
import NavbarControls from './NavbarControls';

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
    <Stack
      spacing="4"
      position="sticky"
      top={`calc(20px + ${navTopOffset})`}
      flex="1"
      as="nav"
      fontSize="sm"
      flexDirection="column"
      h={`calc(100vh - 40px - ${navTopOffset})`}
      w={isExpanded ? 'auto' : '5rem'}
      color="shared.text.default"
      {...props}
    >
      {children}

      {!hideControls && (
        <NavbarControls isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      )}
    </Stack>
  );
};

export default LeftNav;
