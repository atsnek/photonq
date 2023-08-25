import { ArrowBackIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, HStack, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import Link from '../../../../shared/components/Link';
import { TLinkData } from '../../../../shared/types/navigation';

interface IIconCardProps {
  icon: string | ReactNode;
  link: Omit<TLinkData, 'isActive'>;
}

/**
 * Component for displaying an card with an icon and a link
 */
const IconCard: FC<IIconCardProps> = ({ icon, link }) => {
  return (
    <Link
      href={link.href}
      display="block"
      py={4}
      px={8}
      mt={8}
      w="fit-content"
      fontWeight={600}
      borderRadius="lg"
      border="1px solid"
      color="components.iconCard.color"
      bgColor="components.iconCard.bgColor"
      borderColor="components.iconCard.borderColor"
      _hover={{
        color: 'components.iconCard.hover.color',
        bgColor: 'components.iconCard.hover.bgColor',
        borderColor: 'components.iconCard.hover.borderColor',
        boxShadow: 'md',
        '& .sd-icon-card-icon': {
          opacity: 1
        }
      }}
      transition="border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out, color 0.2s ease-in-out"
    >
      <HStack>
        <Center
          className="sd-icon-card-icon"
          opacity={0.5}
          transition="opacity 0.2s ease-in-out"
        >
          {icon}
        </Center>
        <Center>
          <Text>{link.name}</Text>
        </Center>
      </HStack>
    </Link>
  );
};

IconCard.defaultProps = {
  icon: '❤️',
  link: {
    href: '#',
    name: 'This is jaen'
  }
};

export default IconCard;
