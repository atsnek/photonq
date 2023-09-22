import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `device-ipad-plus`.
 */
const TbDeviceIpadPlus = (props: IconProps) => {
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
      <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v7"></path>
      <path d="M9 18h3"></path>
      <path d="M16 19h6"></path>
      <path d="M19 16v6"></path>
    </Icon>
  );
};

export default TbDeviceIpadPlus;
