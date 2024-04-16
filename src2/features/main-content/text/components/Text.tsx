import { Text as ChText } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';
import { IMainContentComponentBaseProps } from '../../types/mainContent';
import { mainComponentBaseStyle } from '../../../../shared/containers/main/mainContent.vars';

export interface ITextProps extends IMainContentComponentBaseProps {
  children?: ReactNode;
}

/**
 * Component for displaying text (in the main content)
 */
const Text: FC<ITextProps> = ({ baseProps, children }) => {
  return <ChText {...baseProps}>{children}</ChText>;
};
Text.defaultProps = {
  baseProps: mainComponentBaseStyle.baseProps
};

export default Text;
