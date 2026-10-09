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

  /**
   * Every field the card shows, read on every render, the loading one
   * included.
   *
   * snek-query writes no query document of its own. It records the fields a
   * render reads off its placeholder proxy and requests exactly those, so a
   * field that is not read before the request goes out is never fetched. The
   * SkeletonText blocks below render their children only once the data is
   * safe, which keeps v3 from mounting them once per skeleton line, but it
   * also meant the author, the stars, the summary, the date and the badges
   * were no longer read while loading. A loaded post then arrived without
   * `user`, `post.user()` threw "is not a function", and React unmounted the
   * whole experiments page.
   *
   * Reading them up here keeps both: the request asks for everything the card
   * draws, and the children still mount once. The `typeof` checks only guard
   * a post whose relations came back missing.
   */
  const author = typeof post.user === 'function' ? post.user() : undefined;
  const authorId = author?.id;
  const authorUserName = author?.profile?.userName;
  const summary = post.summary;
  const createdAt = post.createdAt;
  const language = post.language;
  const privacy = post.privacy;
  const isOwner = post.isOwner;
  const hasStarred = post.hasStarred;
  const likes =
    (typeof post.stars === 'function' ? post.stars()?.totalCount : 0) || 0;

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
                    AND to the <img> (avatar.js passes it down to AvatarImage).
                    In v3 the root, the image and the fallback all read
                    `var(--avatar-radius)`, which only the `shape` variant sets,
                    so the codemod's `borderRadius` prop rounded the box and
                    left the image a circle inside it. `rounded` is `radii.l3`,
                    i.e. radii.md, which is what v2 asked for.

                    The 3rem box and its 1.2rem initials are v2's `getSize(12)`
                    pair and live in `avatarSlotRecipe` (size md) in
                    src/styles/theme/recipes.ts, so nothing is restated here.

                    `alt` is spelled out because v2's AvatarImage emitted
                    `alt={name}` from the avatar's own `name` and v3's does not:
                    Ark's Avatar.Image forwards only what the call site gives
                    it, so the image would otherwise be unlabelled. */}
                <Avatar.Root boxSize="3rem" shape="rounded" objectFit="cover">
                  <Avatar.Fallback name={post.title} />
                  <Avatar.Image src={post.avatarURL} alt={post.title} />
                </Avatar.Root>

                <Stack>
                  {!hideAuthor && (
                    // v3's Skeleton props are `loading` and it is the inverse of
                    // v2's `isLoaded`, so passing the old value through would
                    // have shown the skeleton exactly when the content was
                    // ready. `noOfLines` survives on SkeletonText and means the
                    // number of skeleton lines; the codemod's `lineClamp` is a
                    // different prop and would have been dropped on the floor.
                    //
                    // `height` and the `isLoaded` guard around the children are
                    // the two halves of v3's SkeletonText rewrite, and all
                    // three blocks in this file need both.
                    //
                    // v3 renders `Array.from({length: loading ? noOfLines : 1})`
                    // and spreads `...rest`, children included, into EVERY
                    // line, where v2 handed them to line 0 alone. It also
                    // hard-codes `height: "4"` (16px) per line while loading;
                    // v2's SkeletonText defaulted `skeletonHeight="0.5rem"`.
                    // `...rest` comes after both, so a prop from here wins,
                    // and rendering nothing while loading keeps the extra lines
                    // from mounting the children again. The wrapper and the
                    // loaded children are untouched, so the loaded card is
                    // byte-for-byte what it was.
                    <SkeletonText
                      loading={!isLoaded}
                      noOfLines={1}
                      minW="50px"
                      height={!isLoaded ? '0.5rem' : undefined}
                    >
                      {isLoaded ? (
                        <Link
                          lineClamp={1}
                          variant="hover-theme"
                          fontSize="sm"
                          href={`/users/${authorId}`}
                        >
                          @{authorUserName}
                        </Link>
                      ) : null}
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

              {isOwner && (
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
                              privacy === Privacy.PUBLIC
                                ? Privacy.PRIVATE
                                : Privacy.PUBLIC
                            )
                          }
                          value="item-0"
                        >
                          {privacy === Privacy.PUBLIC ? (
                            <ViewOffIcon color="green.600" />
                          ) : (
                            <ViewIcon color="yellow.300" />
                          )}
                          {privacy === Privacy.PUBLIC
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

            {/* The block that pays for v3's `height: "4"` most visibly: it
                names no `noOfLines`, so it takes the default of 3 and the
                placeholder is 3x16px plus two 8px Stack gaps, i.e. 64px, where
                v2 drew 3x0.5rem plus the same gaps, i.e. 40px. It is also where
                `...rest` mounted the summary three times over. */}
            <SkeletonText
              loading={!isLoaded}
              height={!isLoaded ? '0.5rem' : undefined}
            >
              {isLoaded ? (
                <Text
                  mt="2"
                  flexGrow={1}
                  lineClamp={2}
                  opacity={0.75}
                  className="sd-pp-summary"
                  transition="opacity 0.2s ease-in-out"
                >
                  {summary}
                </Text>
              ) : null}
            </SkeletonText>

            {/* Same pattern once more. The children here are the badge row and
                PostCardRating, whose star is a real <Button> with an onClick,
                so leaving them mounted behind the placeholder puts interactive
                controls under a `pointer-events: none` skeleton. */}
            <SkeletonText
              loading={!isLoaded}
              noOfLines={1}
              height={!isLoaded ? '0.5rem' : undefined}
            >
              {isLoaded ? (
                <HStack mt="4" justifyContent="space-between">
                  <Wrap>
                    {/* Unitless numbers are no longer coerced to px in v3, so a
                        bare 12 emits `font-size: 12` and the browser drops it. */}
                    <Text fontSize="12px" color="shared.text.muted">
                      <NoSSR>{new Date(createdAt).toLocaleDateString()}</NoSSR>
                    </Text>

                    <Badge colorPalette="gray" borderRadius="md">
                      {language}
                    </Badge>

                    <Badge
                      display={isOwner ? 'block' : 'none'}
                      size="sm"
                      borderRadius="md"
                      colorPalette={
                        privacy === Privacy.PUBLIC ? 'yellow' : 'green'
                      }
                    >
                      {privacy === Privacy.PUBLIC && 'Public'}
                      {privacy === Privacy.PRIVATE && 'Private'}
                    </Badge>
                  </Wrap>

                  <PostCardRating
                    id={post.id}
                    likes={likes}
                    hasRated={!!hasStarred}
                    toggleRating={async (id: string) => {
                      if (hasStarred === false) {
                        await sq.mutate(m => m.postStar({ postId: id }));
                      } else if (hasStarred === true) {
                        await sq.mutate(m => m.postUnstar({ postId: id }));
                      }
                    }}
                  />
                </HStack>
              ) : null}
            </SkeletonText>
          </Stack>
        </Card.Body>
      </Card.Root>
    </LinkBox>
  );
};

export default PostCard;
