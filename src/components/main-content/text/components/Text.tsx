import { Text as ChText } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';
import { IMainContentComponentBaseProps } from '../../types/mainContent';

export interface ITextProps extends IMainContentComponentBaseProps {
  children?: ReactNode;
}

/**
 * Component for displaying text (in the main content)
 */
const Text: FC<ITextProps> = ({ baseProps, children }) => {
  return <ChText {...baseProps}>{children}</ChText>;
};
// A defaultProps block stood here and read its value from
// shared/containers/main/mainContent.vars, a module that exists neither in this
// tree nor in v2's. Nothing but the type import in types/mainContent.ts reaches
// this file, which is why a component that cannot even be loaded never showed
// up. The spacing it was meant to default to is not recoverable from the
// source, and borrowing the mt 8 that Heading and ImageCard use would be a
// styling decision, not a migration.

export default Text;
