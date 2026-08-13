import {
  Avatar,
  Card,
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
    <Card.Root
      variant="outline"
      borderRadius="xl"
      _hover={{
        //! transforming the card causes the menu to be cut off by the sibling card
        // transform: 'scale(1.01)',
        boxShadow: 'md',
        borderColor: 'theme.500',
        // `& h5`, not `h5`. v2 handed unknown keys to emotion, which reads a
        // bare tag name as a descendant selector; v3's serializer prefixes
        // anything selector-like with `&` and would emit `&h5`, i.e. "this
        // element, if it is also an h5" — a selector the card can never match,
        // so the name would quietly stop colouring on hover.
        '& h5': {
          color: 'theme.500'
        }
      }}
      asChild
    >
      <LinkBox key={props.id}>
        <Card.Body>
          <Stack flexDir="row">
            {/* v2's default `md` avatar was 3rem across with a
                `calc(3rem / 2.5)` = 1.2rem label. v3's `md` is 2.5rem
                (sizes.10) with a 1rem one, and the site's system defines no
                avatar recipe to say otherwise, so this card's avatar would
                shrink by 8px. Both numbers live in custom properties that the
                root and the fallback slot read, so restating the pair restores
                v2's avatar without pinning width and height behind the slot
                that uses them. */}
            <Avatar.Root
              css={{
                '--avatar-size': '3rem',
                '--avatar-font-size': '1.2rem'
              }}
            >
              <Avatar.Fallback name={props.displayName} />
              <Avatar.Image src={props.avatarUrl || undefined} />
            </Avatar.Root>

            <Stack>
              <Stack flexDir="row">
                <Heading as="h5" size="sm" lineHeight="unset">
                  {props.displayName}
                </Heading>
                <LinkOverlay color="gray.500" asChild>
                  <Link to={`/users/${props.id}`}>@{props.userName}</Link>
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
        </Card.Body>
      </LinkBox>
    </Card.Root>
  );
};

export default UserCard;
