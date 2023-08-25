import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `book-off`.
 */
const TbBookOff = (props: IconProps) => {
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
      <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 5.899 -1.096"></path>
      <path d="M3 6a9 9 0 0 1 2.114 -.884m3.8 -.21c1.07 .17 2.116 .534 3.086 1.094a9 9 0 0 1 9 0"></path>
      <path d="M3 6v13"></path>
      <path d="M12 6v2m0 4v7"></path>
      <path d="M21 6v11"></path>
      <path d="M3 3l18 18"></path>
    </Icon>
  );
};

export default TbBookOff;
