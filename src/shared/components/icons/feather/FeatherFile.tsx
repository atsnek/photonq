import { Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

/**
 * Feather icon for a file.
 */
const FeatherFile = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
    </Icon>
  );
};

export default FeatherFile;
