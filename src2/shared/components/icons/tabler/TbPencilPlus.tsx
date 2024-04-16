import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `pencil-plus`.
 */
const TbPencilPlus = (props: IconProps) => {
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
      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
      <path d="M13.5 6.5l4 4"></path>
      <path d="M16 19h6"></path>
      <path d="M19 16v6"></path>
    </Icon>
  );
};

export default TbPencilPlus;
