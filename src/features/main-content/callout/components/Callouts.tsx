import { Alert, AlertIcon, Box } from '@chakra-ui/react';
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
    <Alert variant={type} borderRadius="lg" p={4} mt={8}>
      <AlertIcon>{icon}</AlertIcon>
      <Box
        __css={{
          '.chakra-text': {
            marginTop: '0 !important'
          }
        }}
      >
        {children}
      </Box>
    </Alert>
  );
};

Callout.defaultProps = {
  children: 'This callout is rockin!'
};

export default Callout;
