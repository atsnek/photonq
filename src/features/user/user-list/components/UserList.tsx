import { FC, useMemo } from 'react';
import { TPaginationData } from '../../../../shared/types/pagination';
import { TUser } from '../../types/user';
import UserPreviewCard from './UserPreviewCard';
import { VStack } from '@chakra-ui/react';

interface IUserListProps {
  listData: TPaginationData<TUser[]>;
}

/**
 * Component for displaying a list of users.
 */
const UserList: FC<IUserListProps> = ({ listData }) => {
  const users = useMemo(() => {
    return listData.items.map(user => <UserPreviewCard user={user} />);
  }, [listData]);

  return <VStack gap={5}>{users}</VStack>;
};

export default UserList;
