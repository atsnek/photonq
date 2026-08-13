import { IconProps, Icon } from '@chakra-ui/react';

import { FaFlask } from '@react-icons/all-files/fa/FaFlask';

import { TProfileStatType } from '../../features/user/types/user';
import TbEye from '../components/icons/tabler/TbEye';
import TbUserShare from '../components/icons/tabler/TbUserShare';
import TbUsers from '../components/icons/tabler/TbUsers';
import { FC } from 'react';

// `as` survives into v3: Icon only falls back to `asChild` when no `as` is
// given (it computes `asChild: !props.as`), so v2's one-liner is still the
// right one. Keeping the spread last also keeps v2's precedence, where a
// caller's props win over the ones set here.
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
