import { IconProps } from '@chakra-ui/react';
import { FC } from 'react';
import FeatherInbox from '../../../shared/components/icons/feather/FeatherInbox';
import TbBuilding from '../../../shared/components/icons/tabler/TbBuilding';
import TbLinkedIn from '../../../shared/components/icons/tabler/TbLinkedIn';
import TbMapPin from '../../../shared/components/icons/tabler/TbMapPin';
import { TSocialLink } from '../profile/components/LeftNavProfile';

const socialLinkIcons: { [key in TSocialLink]: FC<IconProps> } = {
  email: FeatherInbox,
  linkedin: TbLinkedIn,
  location: TbMapPin,
  company: TbBuilding
};

export default socialLinkIcons;
