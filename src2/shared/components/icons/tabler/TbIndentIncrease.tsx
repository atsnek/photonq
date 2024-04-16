import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `indent-increase`.
 */
const TbIndentIncrease = (props: IconProps) => {
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
      <path d="M20 6l-11 0"></path>
      <path d="M20 12l-7 0"></path>
      <path d="M20 18l-11 0"></path>
      <path d="M4 8l4 4l-4 4"></path>
    </Icon>
  );
};

export default TbIndentIncrease;
