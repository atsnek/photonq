import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `book`.
 */
const TbBook = (props: IconProps) => {
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
      <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
      <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
      <path d="M3 6l0 13"></path>
      <path d="M12 6l0 13"></path>
      <path d="M21 6l0 13"></path>
    </Icon>
  );
};

export default TbBook;
