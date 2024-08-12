import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `cloud-upload`.
 */
const TbCloudUpload = (props: IconProps) => {
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
      <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
      <path d="M9 15l3 -3l3 3"></path>
      <path d="M12 12l0 9"></path>
    </Icon>
  );
};

export default TbCloudUpload;
