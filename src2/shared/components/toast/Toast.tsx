import {
  Box,
  ChakraProviderProps,
  HStack,
  Heading,
  Icon,
  StackProps,
  Text,
  ToastOptions,
  ToastProviderProps
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { TToastStatus } from './types/toast';
import TbAlertCircleFilled from '../icons/tabler/TbAlertCircleFilled';
import TbCheckCircleFilled from '../icons/tabler/TbCheckCircleFilled';
import TbXCircleFilled from '../icons/tabler/TbXCircleFilled';
import TbInfoCircleFilled from '../icons/tabler/TbInfoCircleFilled';

const statusIcons: { [key in TToastStatus]: typeof Icon } = {
  success: TbCheckCircleFilled,
  error: TbXCircleFilled,
  warning: TbAlertCircleFilled,
  info: TbInfoCircleFilled
};

export interface IToastProps {
  status?: TToastStatus;
  icon?: ReactNode;
  duration?: number;
  title?: string;
  description?: string;
  containerStyle?: StackProps;
}

/**
 * Function for creating a custom toast.
 * @param props The toast props.
 * @returns The toast.
 */
const Toast: FC<IToastProps> = ({
  icon,
  duration,
  title,
  description,
  containerStyle,
  status = 'success',
  ...props
}) => {
  const FallbackIcon = statusIcons[status];

  return (
    <HStack
      // position="relative"
      bgColor="components.toast.container.bgColor"
      borderRadius="lg"
      px={9}
      py={6}
      spacing={6}
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        w: 'full',
        h: 'full',
        borderRadius: 'lg',
        opacity: 0.2,
        bg: `components.toast.status.${status}.bgColor`,
        zIndex: 0
      }}
      fontWeight="semibold"
      {...props}
    >
      {icon ?? (
        <FallbackIcon
          fontSize="2xl"
          color={`components.toast.status.${status}.color`}
        />
      )}
      <Box>
        {title && (
          <Heading
            as="h6"
            size="sm"
            mb={1}
            color={`components.toast.status.${status}.color`}
          >
            {title}
          </Heading>
        )}
        {description && (
          <Text color="components.toast.description.color">{description}</Text>
        )}
      </Box>
    </HStack>
  );
};

export default Toast;
