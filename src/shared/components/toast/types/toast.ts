import { AlertStatus } from '@chakra-ui/react';

/**
 * All possible toast status
 */
export type TToastStatus = Exclude<AlertStatus, 'loading'>;
