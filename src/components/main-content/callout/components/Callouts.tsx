import { Alert, AlertRootProps, Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface ICalloutProps {
  type?: 'default' | 'info' | 'warning' | 'error';
  icon?: string;
  children: ReactNode;
}

/**
 * Component for displaying a callout/alert.
 * Note: The theming for this component runs under the chakra-ui name "Alert"
 */
const Callout: FC<ICalloutProps> = ({ type = 'default', icon, children }) => {
  return (
    // The four names live in the site's alert slot recipe, but nothing runs
    // `chakra typegen` here, so Alert.Root's variant prop still advertises the
    // built-in union. Same cast the jaen packages use for their own variants.
    <Alert.Root
      variant={type as AlertRootProps['variant']}
      borderRadius="lg"
      p={4}
      mt={8}
    >
      <Alert.Indicator />
      <Box
        css={{
          '& .chakra-text': {
            marginTop: '0 !important'
          }
        }}
      >
        {children}
      </Box>
    </Alert.Root>
  );
};

Callout.defaultProps = {
  children: 'This callout is rockin!'
};

export default Callout;
