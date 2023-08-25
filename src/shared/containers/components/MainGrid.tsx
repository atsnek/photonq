import { Grid, GridProps } from '@chakra-ui/react';
import { FC } from 'react';
import { mainContentWrapperProps } from '../../vars/layout';

interface IMainGridProps extends GridProps {}

const MainGrid: FC<IMainGridProps> = ({ children, ...props }) => {
  return (
    <Grid
      flex={1}
      mt={5}
      maxW={mainContentWrapperProps.default.maxW}
      h="100%"
      mx="auto"
      templateRows="1fr"
      templateColumns={{
        base: '1fr',
        md: '0.8fr 2fr',
        xl: 'minmax(auto, 250px) minmax(auto, 4fr)'
      }}
      gap={10}
      px={{ base: 7, xl: 0 }}
      color="shared.text.bright"
      {...props}
    >
      {children}
    </Grid>
  );
};

export default MainGrid;
