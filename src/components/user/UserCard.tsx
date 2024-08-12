import {
  Avatar,
  Card,
  CardBody,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  Wrap
} from '@chakra-ui/react';
import { FaFlask } from '@react-icons/all-files/fa/FaFlask';
import { Link } from 'gatsby';

import { formatNumber } from '../../utils/general';
import TbUserShare from '../icons/tabler/TbUserShare';
import TbUsers from '../icons/tabler/TbUsers';

export interface UserCardProps {
  id: string;
  avatarUrl: string | null;
  displayName: string;
  userName: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

const UserCard: React.FC<UserCardProps> = props => {
  return (
    <Card
      as={LinkBox}
      key={props.id}
      variant="outline"
      borderRadius="xl"
      _hover={{
        //! transforming the card causes the menu to be cut off by the sibling card
        // transform: 'scale(1.01)',
        boxShadow: 'md',
        borderColor: 'theme.500',
        h5: {
          color: 'theme.500'
        }
      }}
    >
      <CardBody>
        <Stack flexDir="row">
          <Avatar src={props.avatarUrl || undefined} name={props.displayName} />

          <Stack>
            <Stack flexDir="row">
              <Heading as="h5" size="sm" lineHeight="unset">
                {props.displayName}
              </Heading>
              <LinkOverlay as={Link} to={`/users/${props.id}`} color="gray.500">
                @{props.userName}
              </LinkOverlay>
            </Stack>
            <Wrap>
              <Text fontSize="sm">
                <Icon as={FaFlask} mr="2" />
                {formatNumber(props.stats.posts)} Experiments
              </Text>
              <Text fontSize="sm">
                <Icon as={TbUsers} mr="2" />
                {formatNumber(props.stats.followers)} Followers
              </Text>
              <Text fontSize="sm">
                <Icon as={TbUserShare} mr="2" />
                {formatNumber(props.stats.following)} Following
              </Text>
            </Wrap>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default UserCard;
