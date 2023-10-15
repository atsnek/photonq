import { FC, ReactNode, useMemo } from 'react';
import { TPaginationData } from '../../../../shared/types/pagination';
import { TUser } from '../../types/user';
import UserPreviewCard from './UserPreviewCard';
import { VStack } from '@chakra-ui/react';
import UserPreviewCardSkeleton from './UserPreviewCardSkeleton';
import { USER_FETCH_LIMIT } from '../../variables/user';
import usePagination from '../../../../shared/hooks/use-pagination';
import LoadMoreButton from '../../../../shared/components/pagination/LoadMoreButton';

interface IUserListProps {
  listData: TPaginationData<TUser[]>;
  toggleFollow: (id: string) => Promise<boolean>;
  fetchItems: (offset: number) => Promise<boolean>;
}

/**
 * Component for displaying a list of users.
 */
const UserList: FC<IUserListProps> = ({ listData, toggleFollow, fetchItems }) => {
  const pagination = usePagination({
    items: listData.items,
    itemsPerPage: USER_FETCH_LIMIT,
    maxItems: listData.totalCount,
    type: 'load-more',
    hasMoreItems: !!listData.nextCursor || listData.hasMore
  });

  const users = useMemo(() => {
    const output: ReactNode[] = [];

    output.push(
      listData.items.map(user => <UserPreviewCard user={user} toggleFollow={toggleFollow} />)
    );

    if (listData.state === 'loading') {
      Array.from({ length: USER_FETCH_LIMIT }).forEach(() =>
        output.push(<UserPreviewCardSkeleton />)
      );
    }
    return output;
  }, [listData]);

  return (
    <VStack gap={5}>
      {users}
      {listData.hasMore && (
        <LoadMoreButton
          isDisabled={listData.state === 'loading'}
          onClick={() => {
            fetchItems(pagination.currentItems.length);
          }}
        />
      )}
    </VStack>
  );
};

export default UserList;
