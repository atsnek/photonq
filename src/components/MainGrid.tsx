import { Grid, GridProps } from '@chakra-ui/react';
import { FC } from 'react';
import { mainContentWrapperProps } from '../vars/layout';
import useNavOffset from '../hooks/use-nav-offset';

interface IMainGridProps extends GridProps {
  isLeftNavExpanded?: boolean;
}

/**
 * Main grid for the content of the official doc pages.
 */
const MainGrid: FC<IMainGridProps> = ({
  children,
  isLeftNavExpanded = true,
  ...props
}) => {
  const navOffset = useNavOffset();
  return (
    <Grid
      flex={1}
      maxW={mainContentWrapperProps.default.maxW}
      h={`max(mac-content, calc(100vh - ${navOffset}))`}
      mx="auto"
      px="4"
      templateRows="1fr"
      templateColumns={{
        base: '1fr',
        md: '0.8fr 2fr',
        xl: `minmax(auto, ${
          isLeftNavExpanded ? '250px' : 'auto'
        }) minmax(auto, 4fr)`
      }}
      gap={isLeftNavExpanded ? 10 : 0}
      color="shared.text.bright"
      {...props}
    >
      {children}
    </Grid>
  );
};

export default MainGrid;
