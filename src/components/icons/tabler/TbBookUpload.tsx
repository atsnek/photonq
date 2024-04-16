import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `book-upload`.
 */
const TbBookUpload = (props: IconProps) => {
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
      <path d="M14 20h-8a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12v5"></path>
      <path d="M11 16h-5a2 2 0 0 0 -2 2"></path>
      <path d="M15 16l3 -3l3 3"></path>
      <path d="M18 13v9"></path>
    </Icon>
  );
};

export default TbBookUpload;
