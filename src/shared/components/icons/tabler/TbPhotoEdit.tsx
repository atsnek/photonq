import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `photo-edit`.
 */
const TbPhotoEdit = (props: IconProps) => {
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
      <path d="M11 20h-4a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v4"></path>
      <path d="M4 15l4 -4c.928 -.893 2.072 -.893 3 0l3 3"></path>
      <path d="M14 14l1 -1c.31 -.298 .644 -.497 .987 -.596"></path>
      <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z"></path>
    </Icon>
  );
};

export default TbPhotoEdit;
