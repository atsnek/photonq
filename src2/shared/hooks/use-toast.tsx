import {
  Box,
  HStack,
  Heading,
  Icon,
  StackProps,
  Text,
  useToast as useChakraToast
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import TbAlertCircleFilled from '../components/icons/tabler/TbAlertCircleFilled';
import TbCheckCircleFilled from '../components/icons/tabler/TbCheckCircleFilled';
import TbInfoCircleFilled from '../components/icons/tabler/TbInfoCircleFilled';
import TbXCircleFilled from '../components/icons/tabler/TbXCircleFilled';
import { TToastStatus } from '../components/toast/types/toast';

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

const useToast = () => {
  const chakraToast = useChakraToast();
  return ({
    status = 'success',
    icon,
    duration = 5000,
    title,
    description,
    containerStyle
  }: IToastProps) => {
    console.log('toast function call');
    const FallbackIcon = statusIcons[status];
    return chakraToast({
      duration,
      isClosable: true,
      render: () => {
        console.log('toast render call', this);
        return (
          <HStack
            position="relative"
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
            {...containerStyle}
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
                <Text color={`components.toast.description.color`}>
                  {description}
                </Text>
              )}
            </Box>
          </HStack>
        );
      }
    });
  };
};

export default useToast;
