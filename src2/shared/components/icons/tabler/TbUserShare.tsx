import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `user-share`.
 */
const TbUserShare = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
      <path d="M6 21v-2a4 4 0 0 1 4 -4h3"></path>
      <path d="M16 22l5 -5"></path>
      <path d="M21 21.5v-4.5h-4.5"></path>
    </Icon>
  );
};

export default TbUserShare;
