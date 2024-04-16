import { Icon, IconProps } from '@chakra-ui/react';

/**
 * Tabler icon: `filter-up`.
 */
const TbFilterUp = (props: IconProps) => {
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
      <path d="M12 20l-3 1v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v3"></path>
      <path d="M19 16v6"></path>
      <path d="M22 19l-3 3l-3 -3"></path>
    </Icon>
  );
};

export default TbFilterUp;
