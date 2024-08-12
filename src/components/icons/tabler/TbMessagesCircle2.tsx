import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `messages-circle-2`.
 */
const TbMessagesCircle2 = (props: IconProps) => {
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
      <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"></path>
    </Icon>
  );
};

export default TbMessagesCircle2;
