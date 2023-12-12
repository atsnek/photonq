import { IconProps, Icon } from '@chakra-ui/react';

import { FaFlask } from '@react-icons/all-files/fa/FaFlask';

import { TProfileStatType } from '../../features/user/types/user';
import TbEye from '../components/icons/tabler/TbEye';
import TbUserShare from '../components/icons/tabler/TbUserShare';
import TbUsers from '../components/icons/tabler/TbUsers';
import { FC } from 'react';

const FaFlaskIcon = (props: IconProps) => <Icon as={FaFlask} {...props} />;

/**
 * Icons for the profile stats
 */
export const userStatIcons: Partial<{
  [key in TProfileStatType]: FC<IconProps>;
}> = {
  followers: TbUsers,
  following: TbUserShare,
  views: TbEye,
  experiments: FaFlaskIcon
};
