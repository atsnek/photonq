import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `building`.
 */
const TbBuilding = (props: IconProps) => {
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
      <path d="M3 21l18 0"></path>
      <path d="M9 8l1 0"></path>
      <path d="M9 12l1 0"></path>
      <path d="M9 16l1 0"></path>
      <path d="M14 8l1 0"></path>
      <path d="M14 12l1 0"></path>
      <path d="M14 16l1 0"></path>
      <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"></path>
    </Icon>
  );
};

export default TbBuilding;
