import { Flex, Spacer, Stack, StackProps } from '@chakra-ui/react';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import useNavOffset from '../../hooks/use-nav-offset';
import NavbarControls from './NavbarControls';

// Whatever a caller passes beyond the four props below lands on the Stack, so
// Stack's props are the contract. v2 borrowed Flex's and got away with it
// because the two `direction` types overlapped; v3 narrows Stack's to
// StackDirection and the borrowed spelling no longer fits through.
export interface ILeftNavProps extends StackProps {
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
      gap="4"
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
