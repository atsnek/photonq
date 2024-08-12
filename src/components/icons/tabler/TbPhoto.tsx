import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `photo`.
 */
const TbPhoto = (props: IconProps) => {
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
      <path d="M15 8h.01"></path>
      <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"></path>
      <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"></path>
      <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"></path>
    </Icon>
  );
};

export default TbPhoto;
