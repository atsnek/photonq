import { Post, Privacy } from '@/clients/social/src/schema.generated';
import {
  Avatar,
  Badge,
  Box,
  Card,
  HStack,
  Heading,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Menu,
  Portal,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  VStack,
  Wrap
} from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';
import { FC, useState } from 'react';
import PostCardRating from './PostCardRating';
import { useAuth } from 'jaen';
import { sq } from '@/clients/social';
import NoSSR from '../NoSSR';
import {
  DeleteIcon,
  SettingsIcon,
  ViewIcon,
  ViewOffIcon
} from '../icons/chakra';

interface PostCardProps {
  hideAuthor?: boolean;
  post: Post;
  isSafe?: boolean;
  onDelete: (id: string) => void;
  onSetPrivacy: (id: string, privacy: Privacy) => void;
}

const PostCard: FC<PostCardProps> = ({
  hideAuthor,
  post,
  isSafe,
  onDelete,
  onSetPrivacy
}) => {
  const isLoaded = isSafe !== undefined ? isSafe : true;

  return (
    // v2's `as={Card}` is `asChild` here, and the codemod's `<Card>` was not a
    // component at all: v3 exports Card as a namespace, so it renders nothing
    // and throws. `variant` moves onto Card.Root rather than riding through
    // LinkBox — LinkBox has no recipe, so it would forward the prop untyped and
    // only work by accident. The style props stay on LinkBox: they are folded
    // into a class that is handed to Card.Root and re-serialised after the card
    // recipe, so `borderRadius` and the `_hover` block still win.
    <LinkBox
      key={post.id}
      asChild
      borderRadius="xl"
      _hover={{
        //! transforming the card causes the menu to be cut off by the sibling card
        // transform: 'scale(1.01)',
        boxShadow: 'md',
        borderColor: 'theme.500',
        // `'& h5'`, not `h5`. v3 asks @pandacss/is-valid-prop whether a
        // nested key is a CSS property and emits it as one when it is not a
        // selector, so a bare tag name produces `h5: {...}` and the card title
        // stops changing colour on hover. v2's styled-system read any
        // non-property key as a selector.
        '& h5': {
          color: 'theme.500'
        },
        // Same reason as the tag selector above: v3 wants the `&` so it knows
        // this is a descendant selector rather than a property name.
        '& .sd-pp-summary': {
          opacity: 1
        }
      }}
    >
      <Card.Root variant="outline">
        {/* `p` restates v2's own `--card-padding` for size md, which was
            `space.5` (20px) in @chakra-ui/theme components/card.js; v3's md is
            `spacing.6` (24px). PostCardSkeleton spells the same 20px out as
            `p="5"`, so taking v3's default here would make the skeleton and the
            card it stands in for different heights while a page is loading. */}
        <Card.Body justifyContent="end" p="5" asChild>
          <Stack>
            <HStack justifyContent="space-between">
              <HStack w="full" gap="3">
                {/* v2's Avatar handed its `borderRadius` prop to the container
                    AND to the <img> (avatar.js passes it down to AvatarImage),
                    and sized the initials from the avatar's own size with
                    `--avatar-font-size: calc(size / 2.5)` — 1.2rem here.

                    In v3 the root, the image and the fallback all read
                    `var(--avatar-radius)`, which only the `shape` variant sets,
                    so the codemod's `borderRadius` prop rounded the box and
                    left the image a circle inside it. `rounded` is `radii.l3`,
                    i.e. radii.md, which is what v2 asked for. The font size now
                    comes from the `size` variant (1rem for md), so v2's value
                    is restated as the custom property the fallback reads — the
                    same pair UserCard restates. Both are visible whenever a
                    post has no avatarURL, which is the common case. */}
                <Avatar.Root
                  boxSize="3rem"
                  shape="rounded"
                  objectFit="cover"
                  css={{ '--avatar-font-size': '1.2rem' }}
                >
                  <Avatar.Fallback name={post.title} />
                  <Avatar.Image src={post.avatarURL} />
                </Avatar.Root>

                <Stack>
                  {!hideAuthor && (
                    // v3's Skeleton props are `loading` and it is the inverse of
                    // v2's `isLoaded`, so passing the old value through would
                    // have shown the skeleton exactly when the content was
                    // ready. `noOfLines` survives on SkeletonText and means the
                    // number of skeleton lines; the codemod's `lineClamp` is a
                    // different prop and would have been dropped on the floor.
                    <SkeletonText loading={!isLoaded} noOfLines={1} minW="50px">
                      <Link
                        lineClamp={1}
                        variant="hover-theme"
                        fontSize="sm"
                        href={`/users/${post.user().id}`}
                      >
                        @{post.user().profile.userName}
                      </Link>
                    </SkeletonText>
                  )}
                  <Heading
                    as="h5"
                    size="sm"
                    transition="color 0.2s ease-in-out"
                    flex={1}
                    w={{ base: 'full', md: 'auto' }}
                  >
                    <LinkOverlay asChild>
                      <Link to={`/experiments/${post.slug}`}>{post.title}</Link>
                    </LinkOverlay>
                  </Heading>
                </Stack>
              </HStack>

              {post.isOwner && (
                <Menu.Root>
                  <Menu.Trigger asChild>
                    {/* v3's IconButton has no `icon` prop; the glyph is a child. */}
                    <IconButton variant="outline" mb="auto" size="sm">
                      <SettingsIcon />
                    </IconButton>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        {/* Same for Menu.Item: v2's `icon` prop is gone, and the
                            icon is the first child. The item's own `gap` spaces
                            it, where v2 used the icon wrapper's margin. */}
                        <Menu.Item
                          onSelect={() =>
                            onSetPrivacy(
                              post.id,
                              post.privacy === Privacy.PUBLIC
                                ? Privacy.PRIVATE
                                : Privacy.PUBLIC
                            )
                          }
                          value="item-0"
                        >
                          {post.privacy === Privacy.PUBLIC ? (
                            <ViewOffIcon color="green.600" />
                          ) : (
                            <ViewIcon color="yellow.300" />
                          )}
                          {post.privacy === Privacy.PUBLIC
                            ? 'Make Private'
                            : 'Make Public'}
                        </Menu.Item>
                        <Menu.Item
                          onSelect={() => onDelete(post.id)}
                          value="item-1"
                        >
                          <DeleteIcon color="red.500" />
                          Delete
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              )}
            </HStack>

            <SkeletonText loading={!isLoaded}>
              <Text
                mt="2"
                flexGrow={1}
                lineClamp={2}
                opacity={0.75}
                className="sd-pp-summary"
                transition="opacity 0.2s ease-in-out"
              >
                {post.summary}
              </Text>
            </SkeletonText>

            <SkeletonText loading={!isLoaded} noOfLines={1}>
              <HStack mt="4" justifyContent="space-between">
                <Wrap>
                  {/* Unitless numbers are no longer coerced to px in v3, so a
                      bare 12 emits `font-size: 12` and the browser drops it. */}
                  <Text fontSize="12px" color="gray.600">
                    <NoSSR>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </NoSSR>
                  </Text>

                  <Badge colorPalette="gray" borderRadius="md">
                    {post.language}
                  </Badge>

                  <Badge
                    display={post.isOwner ? 'block' : 'none'}
                    size="sm"
                    borderRadius="md"
                    colorPalette={
                      post.privacy === Privacy.PUBLIC ? 'yellow' : 'green'
                    }
                  >
                    {post.privacy === Privacy.PUBLIC && 'Public'}
                    {post.privacy === Privacy.PRIVATE && 'Private'}
                  </Badge>
                </Wrap>

                <PostCardRating
                  id={post.id}
                  likes={post.stars().totalCount || 0}
                  hasRated={!!post.hasStarred}
                  toggleRating={async (id: string) => {
                    if (post.hasStarred === false) {
                      await sq.mutate(m => m.postStar({ postId: id }));
                    } else if (post.hasStarred === true) {
                      await sq.mutate(m => m.postUnstar({ postId: id }));
                    }
                  }}
                />
              </HStack>
            </SkeletonText>
          </Stack>
        </Card.Body>
      </Card.Root>
    </LinkBox>
  );
};

export default PostCard;
