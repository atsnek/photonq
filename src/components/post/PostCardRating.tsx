import { FC, useEffect, useState } from 'react';
import { Box, Button, HStack, Portal, Text, Tooltip } from '@chakra-ui/react';
import TbStar from '../icons/tabler/TbStar';
import { formatNumber } from '../../utils/general';
import { useAuth } from 'jaen';

interface PostCardRatingProps {
  id: string;
  likes: number;
  hasRated?: boolean;
  isRating?: boolean;
  isAuthor?: boolean;
  toggleRating: (id: string) => void;
  useHighContrast?: boolean;
}

/**
 * Component for displaying a post preview rating.
 */
const PostCardRating: FC<PostCardRatingProps> = ({
  id,
  isRating,
  isAuthor,
  toggleRating,
  useHighContrast,
  ...props
}) => {
  const { isAuthenticated, signinRedirect } = useAuth();

  const [likes, setLikes] = useState(props.likes);

  useEffect(() => {
    setLikes(props.likes);
  }, [props.likes]);

  const [hasRated, setHasRated] = useState(props.hasRated);

  useEffect(() => {
    setHasRated(props.hasRated);
  }, [props.hasRated]);

  const handleRating = () => {
    setLikes(hasRated ? likes - 1 : likes + 1);
    setHasRated(!hasRated);

    toggleRating(id);
  };

  if (isAuthenticated) {
    return (
      /**
       * v2's `variant="unstyled"` is `variant="plain"` here, not the `unstyled`
       * prop the codemod reached for.
       *
       * v2's unstyled variant only blanked the background, the padding and the
       * margins; the button KEPT the base and the size, so this rendered as a
       * 2rem-tall, 2rem-wide, `borderRadius: md`, centred flex box at
       * `fontSize: sm`. v3's `unstyled` prop skips the recipe entirely, which
       * loses all of that — and with it `position: relative`, without which the
       * `zIndex` below has nothing to act on and the LinkOverlay's ::before in
       * PostCard covers the button, so the star stops being clickable and
       * navigates to the post instead.
       *
       * `plain` keeps the base and the size and declares only a colour, which
       * the `color` prop below overrides. `gap="0"` is the one thing it adds
       * that v2 did not have: photonq's size scale gives every button `gap: 2`
       * to replace v2's leftIcon margin, and this call site spaces its icon
       * itself with `mr={1}`.
       */
      <Button
        display="flex"
        variant="plain"
        size="sm"
        gap="0"
        color={`features.rating.${hasRated ? 'rated' : 'unrated'}.color`}
        _hover={
          !isAuthor
            ? {
                color: `features.rating._hover.color`,
                bgColor: `features.rating._hover${
                  useHighContrast ? '.highContrast' : ''
                }.bgColor`
              }
            : {}
        }
        onClick={handleRating}
        px={2}
        disabled={isRating}
        // prevents the button to to be placed underneath the link overlay
        zIndex={1}
        transition="color 0.2s ease-in-out, background-color 0.2s ease-in-out"
      >
        <TbStar
          boxSize={3}
          mr={1}
          fill={hasRated ? 'currentColor' : 'none'}
          stroke={hasRated ? 'none' : 'currentColor'}
          transition="fill 0.2s ease-in-out, stroke 0.2s ease-in-out"
        />
        <Text fontSize="12px">{formatNumber(likes)}</Text>
      </Button>
    );
  }
  return (
    /**
     * v2's single-element Tooltip is v3's compound one. `@/components/ui/tooltip`
     * that the codemod imported does not exist in this repo — no CLI snippets
     * were generated — so this uses the parts from @chakra-ui/react directly,
     * the same shape Filesystem.tsx already uses.
     *
     * The delays are stated because they differ: v2's Tooltip opened and closed
     * with no delay, Ark's waits 1000ms/500ms. `aria-label` moves onto the
     * trigger, which is where v2 put it once a tooltip carried one.
     */
    <Tooltip.Root openDelay={0} closeDelay={0}>
      <Tooltip.Trigger asChild>
        <Button
          aria-label="Sign up to rate this post"
          display={'flex'}
          variant="plain"
          size={'sm'}
          px="2"
          color="features.rating.disabled.color"
          // v2 had `_hover={{color: 'features.rating._hover.disabled.color'}}`
          // here and that token path does not exist: `features.rating._hover`
          // has color, bgColor and highContrast, no `disabled`. v2 emitted the
          // unresolved string, the browser dropped the declaration at parse
          // time and the label simply did not change on hover. v3 emits a
          // custom property instead, which is invalid at COMPUTED-VALUE time,
          // and an inherited property that dies there falls back to `inherit` —
          // so keeping the line would have started repainting the label on
          // hover in a colour v2 never showed. Dropped to keep the v2 render.
          transition="color 0.2s ease-in-out"
          onClick={() =>
            signinRedirect({
              prompt: 'create'
            })
          }
          fontSize="12px"
        >
          <TbStar fill="none" stroke="currentColor" />
          {formatNumber(likes)}
        </Button>
      </Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>Sign up to rate this post</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  );
};

export default PostCardRating;
