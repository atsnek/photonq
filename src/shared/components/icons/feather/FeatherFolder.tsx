import { Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

/**
 * Feather icon for a folder.
 */
const FeatherFolder = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </Icon>
  );
};

export default FeatherFolder;
