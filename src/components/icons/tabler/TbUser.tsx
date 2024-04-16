import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `user`.
 */
const TbUser = (props: IconProps) => {
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
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
    </Icon>
  );
};

export default TbUser;
