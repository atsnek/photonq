import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `user-cancel`.
 */
const TbUserCancel = (props: IconProps) => {
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
      <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5"></path>
      <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
      <path d="M17 21l4 -4"></path>
    </Icon>
  );
};

export default TbUserCancel;
