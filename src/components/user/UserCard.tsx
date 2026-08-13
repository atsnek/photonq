import {
  Steps,
  Avatar,
  Card,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  Wrap,
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
    <Card.Root
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
      asChild><LinkBox key={props.id}>
        <Card.Body>
          <Stack flexDir="row">
            <Avatar.Root><Avatar.Fallback name={props.displayName} /><Avatar.Image src={props.avatarUrl || undefined} /></Avatar.Root>

            <Stack>
              <Stack flexDir="row">
                <Heading as="h5" size="sm" lineHeight="unset">
                  {props.displayName}
                </Heading>
                <LinkOverlay color="gray.500" asChild><Link to={`/users/${props.id}`}>@{props.userName}
                  </Link></LinkOverlay>
              </Stack>
              <Wrap>
                <Text fontSize="sm">
                  <Icon mr="2" asChild><FaFlask /></Icon>
                  {formatNumber(props.stats.posts)} Experiments
                </Text>
                <Text fontSize="sm">
                  <Icon mr="2" asChild><TbUsers /></Icon>
                  {formatNumber(props.stats.followers)} Followers
                </Text>
                <Text fontSize="sm">
                  <Icon mr="2" asChild><TbUserShare /></Icon>
                  {formatNumber(props.stats.following)} Following
                </Text>
              </Wrap>
            </Stack>
          </Stack>
        </Card.Body>
      </LinkBox></Card.Root>
  );
};

export default UserCard;
