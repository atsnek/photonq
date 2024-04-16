import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `square-rounded-x`.
 */
const TbSquareRoundedX = (props: IconProps) => {
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
      <path d="M4 7h16"></path>
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
      <path d="M10 12l4 4m0 -4l-4 4"></path>
    </Icon>
  );
};

export default TbSquareRoundedX;
