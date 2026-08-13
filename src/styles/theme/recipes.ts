/**
 * The site's component recipes, ported from `components/` and pruned to what a
 * call site can actually select.
 *
 * The pruning was measured, not guessed: every `variant="..."` string in the
 * tsx files was counted against photonq's own main branch, before the shared
 * migration was merged in, so the count reflects what photonq renders rather
 * than what its sibling does. The dynamic case was checked by hand because a
 * literal grep misses it, and it mattered once: `Callouts.tsx` renders
 * `<Alert variant={type}>` where type defaults to 'default', so all four Alert
 * variants are live despite only `info` ever appearing as a literal.
 *
 * Dropped entirely, each with zero consumers: the Avatar recipe (`square`), the
 * Checkbox recipe (`rounded`), the Switch recipe (`privacy`, `brand` — no
 * `<Switch>` exists in the site at all), Input's, Textarea's and InputGroup's
 * `ghost` (all seven `variant="ghost"` uses are Buttons or IconButtons, where
 * ghost is a v3 built-in), Menu's `search-result`, Link's `hover-opacity` and
 * `pq-footer`, and six of the twelve Button variants: invisible,
 * ghost-hover-opacity, outline-hover-filled, pq-ghost, filledGreen,
 * filledYellow and filledRed.
 *
 * Counting the attribute alone is not enough, and this cost one variant on the
 * first pass: DocsLayout and pages/docs select Link's `right-bottom-nav` from
 * inside a props OBJECT, never as a `variant=` attribute. A variant a recipe
 * does not know is ignored without an error, so the miss would have shown up as
 * two docs links quietly losing their layout. Every string was re-counted
 * against object literals as well.
 *
 * Token paths are untouched. v3 resolves tokens by path, so every
 * `components.button.ghost.hover.bgColor` string here means what it did in v2.
 */
import { defineRecipe, defineSlotRecipe } from '@chakra-ui/react';

/**
 * The six sizes the docs headings select, and the reason they are sizes at all.
 *
 * v2's docs Heading picked its size with a `fontSize` STYLE PROP, one flat
 * pixel value per level (`main-content/heading/components/Heading.tsx`, the
 * `variantFontSizes` map). That worked because v2 merged the styleConfig and
 * the style props into one object before serialising it, with `assignAfter`, so
 * a scalar prop deleted and replaced the styleConfig's whole responsive
 * `fontSize` array. The emitted rule carried a single `font-size: 30px` and no
 * media query.
 *
 * v3 does not merge in that order and cannot be made to. `cva()` runs the
 * recipe through `css()` FIRST, which turns `fontSize: ['3xl', null, '4xl']`
 * into a flat `fontSize` plus an `@media screen and (min-width: 48rem)` key,
 * and only then does use-resolved-props merge the style props on top. A style
 * prop is prop-first (`{fontSize: {...}}`) while the serialised recipe is
 * condition-first (`{'@media …': {fontSize: …}}`), so the two never collide:
 * the prop overwrites the unconditional entry and the recipe's media rule wins
 * again from 768px up. Naming the breakpoint in the prop does not help either,
 * because `css()` walks the merged object in key order and the recipe's own
 * `@media` key comes last.
 *
 * A recipe variant has no such problem. Variants are merged as raw style
 * objects BEFORE the single `css()` call, so a flat `fontSize` here simply
 * replaces the responsive one from `defaultVariants.size` and no media entry
 * for font-size is ever emitted. That also restores the v2 property call sites
 * relied on: a `fontSize` prop passed by a caller can override this again,
 * because there is no longer a media rule to lose to.
 *
 * `lineHeight` stays responsive, because v2's did: the docs Heading never
 * overrode it, so it kept size xl's `[1.33, null, 1.2]` and rendered 1.33 below
 * 768px and 1.2 above.
 */
const docsHeadingSizes = Object.fromEntries(
  Object.entries({ h1: 36, h2: 30, h3: 24, h4: 20, h5: 18, h6: 16 }).map(
    ([level, px]) => [
      level,
      // A fresh array per level. `mergeWith` assigns array references straight
      // through and then mutates them in place on the next merge, so a shared
      // literal would be a live wire between the six entries.
      { fontSize: `${px}px`, lineHeight: [1.33, null, 1.2] }
    ]
  )
);

/**
 * The two sizes the site's own (non-docs) headings select.
 *
 * Same story as `docsHeadingSizes`, same remedy, different call sites. Both
 * were a `fontSize` STYLE PROP in v2 that worked there and stops working in v3,
 * because `defaultVariants.size` is `xl` and its `fontSize: ['3xl', null,
 * '4xl']` becomes an `@media (min-width: 48rem)` key that no prop can reach.
 *
 * `card`        Testimonials' heading. v2: 20px throughout, leading 1.33 below
 *               768px and 1.2 above — the default size's own pair, because v2's
 *               prop replaced only the fontSize. v3 would render 36px/43.2 from
 *               768px up.
 * `menu-group`  SearchResultSection's group label inside the search overlay.
 *               v2: 12px throughout with the same pair. v3 would render
 *               36px/43.2 from 768px up, a twelve-pixel label at thirty-six.
 *               Reachable with the `/` key on any page.
 */
const siteHeadingSizes = {
  card: { fontSize: 'xl', lineHeight: [1.33, null, 1.2] },
  'menu-group': { fontSize: '12px', lineHeight: [1.33, null, 1.2] }
};

/**
 * A recipe the site did not have and now needs. It restores a v2 built-in
 * default the site never overrode and therefore never wrote down.
 *
 * v2 mapped `<Heading size="md">` to fontSize xl (1.25rem). v3 maps it to
 * textStyle md, which is 1rem. Seven headings pass size="md" and three pass
 * size="sm", and without this they would all quietly shrink. The scale below is
 * v2's own, read off `theme.components.Heading.sizes`.
 */
export const headingRecipe = defineRecipe({
  base: { fontFamily: 'heading', fontWeight: 'bold' },
  variants: {
    size: {
      '4xl': { fontSize: ['6xl', null, '7xl'], lineHeight: 1 },
      '3xl': { fontSize: ['5xl', null, '6xl'], lineHeight: 1 },
      '2xl': { fontSize: ['4xl', null, '5xl'], lineHeight: [1.2, null, 1] },
      xl: { fontSize: ['3xl', null, '4xl'], lineHeight: [1.33, null, 1.2] },
      lg: { fontSize: ['2xl', null, '3xl'], lineHeight: [1.33, null, 1.2] },
      md: { fontSize: 'xl', lineHeight: 1.2 },
      sm: { fontSize: 'md', lineHeight: 1.2 },
      xs: { fontSize: 'sm', lineHeight: 1.2 },
      ...docsHeadingSizes,
      ...siteHeadingSizes
    }
  }
});

/**
 * The other recipe the site never had, and the one that moves every page.
 *
 * v2's stock Container was `{w: '100%', mx: 'auto', maxW: 'prose', px: '4'}`:
 * a flat 16px gutter at every width. v3's is
 * `px: {base: '4', md: '6', lg: '8'}`, so the gutter grows to 24px at md and to
 * 32px at the site's pinned lg (992px). The site registered no Container
 * styleConfig in v2, which is why nothing in the diff mentions `px`: the
 * default moved underneath thirteen untouched call sites, and DocsLayout nests
 * two of them, so the article column pays it twice.
 *
 * The second half of the damage is not about the value at all. `cva()`
 * serialises a recipe's base BEFORE the style props are merged in, so the
 * responsive entries arrive as `@media` keys that a prop can no longer reach.
 * Restoring the scalar removes them, and prop overrides behave as they did.
 *
 * maxW and `position: relative` stay at v3's values: every <Container> in the
 * site passes an explicit maxW, so the base is never read.
 */
export const containerRecipe = defineRecipe({
  base: { px: '4' }
});

/**
 * The site's six live variants, plus the parts of v2's Button base and size
 * scale that v3 moved.
 *
 * `fontWeight`  v2's base was `semibold`, v3's is `medium`. Every button label
 *               in the site got one step lighter.
 * `borderWidth` v2's base had none. v3's base is `borderWidth: 1px` with
 *               `borderColor: transparent`, which is 2px of width and 2px of
 *               height that v2 never paid. The three variants that genuinely
 *               draw a border ask for it back below.
 * `lineHeight`  v2's base was `1.2` and nothing overrode it. v3 keeps `1.2` in
 *               the base but then puts `textStyle` in every size, and a
 *               textStyle carries its own line-height as a length, so the base
 *               loses. 20px where v2 computed 16.8px.
 * `fontSize`    the same textStyle carries a size. v3's `md` is 14px where v2's
 *               `md` was 16px, so every button that does not name a size
 *               shrank. The scale below is v2's own, from @chakra-ui/theme
 *               components/button.js.
 * `gap`         v2 declared none on the button and spaced icons with the
 *               `chakra-button__icon` span's own `margin-inline-end: 0.5rem`.
 *               The codemod turns every `leftIcon`/`rightIcon` into a plain
 *               child, so that span is gone and the margin with it. 8px is what
 *               v2 actually rendered.
 *
 * `h`, `minW` and `px` are v2's too: v3 moved xs from 6 to 8, sm from 8 to 9
 * and lg from 12 to 11, and shifted their paddings with them.
 *
 * NOT here, deliberately: `solid`, `ghost`, `link` and `unstyled` beyond what
 * is written below. photonq's v2 styleConfig declared no `outline` and no
 * `ghost` at all — those 19 and 7 call sites selected @chakra-ui/theme's own,
 * coloured by `withDefaultColorScheme({colorScheme: 'brand'})`. v3's built-ins
 * are the replacement, and `html { colorPalette: 'brand' }` in system.ts is
 * what re-colours them. Only where v2's built-in and v3's actually disagree
 * does a variant appear below.
 */
export const buttonRecipe = defineRecipe({
  base: { fontWeight: 'semibold', borderWidth: 0 },
  variants: {
    /**
     * `textStyle: ''` is load-bearing, not leftover.
     *
     * A textStyle is expanded late, and the expansion beats a `lineHeight`
     * declared beside it in the same object. Its `fontSize` does not win that
     * fight, which is the confusing part: setting only fontSize and lineHeight
     * gives v2's size with v3's leading. Blanking the textStyle first is what
     * lets both values through.
     */
    size: {
      lg: { textStyle: '', h: '12', minW: '12', fontSize: 'lg', px: '6', gap: 2, lineHeight: 1.2 },
      md: { textStyle: '', h: '10', minW: '10', fontSize: 'md', px: '4', gap: 2, lineHeight: 1.2 },
      sm: { textStyle: '', h: '8', minW: '8', fontSize: 'sm', px: '3', gap: 2, lineHeight: 1.2 },
      xs: { textStyle: '', h: '6', minW: '6', fontSize: 'xs', px: '2', gap: 2, lineHeight: 1.2 }
    },
    variant: {
      // v2's whole `solid` entry, which is the site's default variant and so
      // reaches every <Button> that names none. Its colour came from the
      // brand colour scheme, not from here, and still does.
      solid: { textTransform: 'capitalize' },

      /**
       * v2's built-in outline, restored in the one declaration v3 changed.
       *
       * @chakra-ui/theme's variantOutline was ghost's styles plus
       * `border: 1px solid` with `borderColor: currentColor` for every scheme
       * except gray. v3 paints `colorPalette.border` instead, which for brand
       * is brand.500 in light mode against a brand.600 label — close enough to
       * read as a bug rather than a border. `currentColor` puts the outline
       * back on the label's own colour, which is what these 19 buttons had.
       *
       * `borderWidth` is asked for again because the base above sets it to 0
       * for the benefit of every other variant.
       */
      outline: { borderWidth: '1px', borderColor: 'currentColor' },

      /**
       * Every background below is spelled `bg`, not `bgColor`, and that matters
       * more in v3 than it reads.
       *
       * v2 emitted declarations in source order: the variant's
       * `background-color` first, a call site's `bg` prop after it, and the
       * later shorthand won. v3's engine sorts the final declarations by
       * property, shorthands before longhands, so that a longhand can refine a
       * shorthand — which means a recipe's `background-color` is emitted AFTER
       * a call site's `background` and quietly beats it. A `bg` prop can
       * therefore never override a `bgColor` recipe in v3, whatever the call
       * site says. Spelling it `bg` here also collapses the two rival
       * declarations into one, because it lands on the same key as the default
       * recipe's `bg` and replaces it.
       */
      'ghost-hover': {
        textTransform: 'capitalize',
        bg: 'transparent',
        opacity: 0.7,
        _hover: { bg: 'components.button.ghost.hover.bgColor', opacity: 1 },
        _focus: { bg: 'components.button.ghost.hover.bgColor', opacity: 1 }
      },
      'ghost-hover-outline': {
        textTransform: 'capitalize',
        bg: 'transparent',
        borderWidth: '1px',
        borderColor: 'transparent',
        color: 'components.button.ghostHoverOutline.color',
        _hover: {
          borderColor: 'components.button.ghostHoverOutline.hover.borderColor',
          color: 'components.button.ghostHoverOutline.hover.color'
        },
        _disabled: {
          opacity: 0.5,
          _hover: {
            borderColor: 'transparent',
            color: 'components.button.ghostHoverOutline.color'
          }
        },
        transition:
          'background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out'
      },
      'pq-outline': {
        textTransform: 'capitalize',
        bg: 'rgba(2, 116, 192, 0.07)',
        borderWidth: '1px',
        borderColor: 'brand.500',
        color: 'brand.500',
        px: 5,
        borderRadius: 'lg',
        _hover: { bg: 'brand.600', color: 'white', transform: 'scale(1.05)' },
        transition:
          'background-color 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease-in-out'
      },
      'pq-solid': {
        textTransform: 'capitalize',
        bg: 'brand.500',
        color: 'white',
        px: 5,
        borderRadius: 'lg',
        _hover: {
          transform: 'scale(1.05)',
          // `3x` is a typo in v2's styleConfig, not in this port. It makes the
          // whole declaration invalid, so v2 drew no hover shadow on these four
          // buttons and neither does this. Kept as-is: a migration that quietly
          // starts painting a shadow the old site never painted is a migration
          // that cannot be checked against the old site.
          boxShadow: '3x 3px 10px rgba(2, 116, 192, 0.5)'
        },
        transition:
          'background-color 0.2s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
      }
    }
  }
});

/**
 * v2's Link base, restored where v3 diverges. `hover-theme` is the site's own
 * and unchanged.
 *
 * `color`. v2's Link base was `color: 'inherit'` (@chakra-ui/theme
 * components/link.js) and the site never overrode it, so every link on every
 * page took the body colour. v3 dropped the base declaration and moved colour
 * into the variants: both `plain`, which is the recipe's defaultVariant and
 * therefore what an unadorned <Link> selects, and `underline` set
 * `color: colorPalette.fg`. On its own that would still be invisible, because
 * `--chakra-colors-color-palette-fg` resolves to nothing and an invalid custom
 * property leaves an inherited property inherited — but registering
 * `html { colorPalette: 'brand' }` in system.ts gives the variable a value, and
 * every default-variant link in the site would turn brand.600 in one step. The
 * docs left nav is where it shows most, because every entry there is a <Link>.
 *
 * `hover-theme` does NOT need the same treatment: Chakra's variants are
 * exclusive within a group, so `<Link variant="hover-theme">` never picks up
 * `plain`, and it declares no colour of its own.
 *
 * `display`, `gap` and `alignItems`. v2's Link base declared none of the three,
 * so an <a> stayed inline and laid its children out in the normal flow. v3's
 * base is `display: inline-flex` with `gap: 1.5` and `alignItems: center`.
 *
 * The display alone reflows the left nav's expandable entries: v2's inline <a>
 * let the AccordionButton inside it resolve `width: 100%` against the accordion
 * item and fill all 256px, so the chevron sat at the right edge, while v3's
 * inline-flex <a> shrinks to the label and drags the chevron in behind the
 * text. `gap` and `alignItems` have to be reset in their own right rather than
 * left inert by `display: inline`, because a call site that sets its own
 * display brings them back to life — the docs prev/next pair is exactly that.
 */
export const linkRecipe = defineRecipe({
  base: { display: 'inline', gap: 0, alignItems: 'normal' },
  variants: {
    variant: {
      plain: { color: 'inherit' },
      underline: { color: 'inherit' },
      'hover-theme': {
        _hover: { color: 'components.link._hover.color' },
        transition: 'color 0.1s ease-in-out'
      },
      /**
       * The docs prev/next pair at the foot of every documentation page.
       *
       * This one is not selected with a `variant=` attribute, which is why a
       * grep for the attribute misses it: DocsLayout and pages/docs both build
       * their link props as an object and set `variant: 'right-bottom-nav'`
       * inside it. Dropping it would have left both call sites resolving to
       * nothing — a v3 recipe silently ignores a variant it does not know, so
       * the two links would simply have gone back to inline flow at full
       * opacity with no error anywhere.
       *
       * `display: block` beats the base's `inline` because a variant is applied
       * after the base.
       */
      'right-bottom-nav': {
        display: 'block',
        width: '100%',
        opacity: 0.7,
        _hover: { opacity: 1 },
        transition: 'opacity 0.1s ease-in-out'
      }
    }
  }
});

/**
 * v2's Skeleton, restored in the variant rather than the base.
 *
 * The base is where photonq's v2 styleConfig put `borderRadius: 'md'`, and in
 * v3 that is the one place it cannot go: `cva()` applies the base first and
 * v3's built-in `loading: true` variant then sets `borderRadius: 'l2'` on top,
 * so the site's radius never reached a single skeleton. Everything below sits
 * in the variant for that reason.
 *
 * The rest is v2's own look, which v3 replaced wholesale. v2's skeleton was a
 * gray.100 block at 0.7 opacity fading its BACKGROUND-COLOR to gray.400 and
 * back, 0.8s linear alternate (@chakra-ui/theme components/skeleton.js plus the
 * component's own `fade` keyframes). v3 paints a flat `bg.emphasized` at full
 * opacity and animates OPACITY between 1 and 0.5 over 1.2s. Different colour,
 * different rhythm, one step darker in light mode.
 *
 * The two custom properties keep v2's spelling, so a call site that wants a
 * different pair can still set `--skeleton-start-color` the way it could in v2.
 */
export const skeletonRecipe = defineRecipe({
  variants: {
    loading: {
      // Only the radius and the two variables live here. Anything that PAINTS
      // has to go in the `variant` group below, because cva walks the merged
      // recipe's variant keys in the default recipe's own order — `loading`
      // first, `variant` second — so v3's `pulse` is applied after this block
      // and would overwrite a background declared in it.
      true: {
        borderRadius: 'md',
        '--skeleton-start-color': {
          base: 'colors.gray.100',
          _dark: 'colors.gray.800'
        },
        '--skeleton-end-color': {
          base: 'colors.gray.400',
          _dark: 'colors.gray.600'
        }
      }
    },
    variant: {
      // Named `pulse` because that is v3's default variant and therefore what
      // every unadorned <Skeleton> in the site selects. The animation itself is
      // v2's: background-color, not opacity.
      pulse: {
        background: 'var(--skeleton-start-color)',
        opacity: 0.7,
        animation: 'skeleton-fade 0.8s linear infinite alternate',
        /**
         * Spelled out rather than left to the shorthand above, and this is the
         * shorthand-before-longhand rule biting again.
         *
         * v3's own pulse variant carries `animationDuration: var(--duration,
         * 1.2s)` as a LONGHAND. Merging happens per key, so that longhand
         * survives beside this variant's `animation` shorthand, and v3 sorts
         * the final declarations shorthand-first so a longhand can refine a
         * shorthand. The 1.2s would therefore have been emitted after the
         * shorthand's 0.8s and won. Setting it to `undefined` does not help:
         * the default's key is still there to be sorted in.
         */
        animationDuration: '0.8s'
      }
    }
  }
});

/**
 * v2's UnorderedList and OrderedList, as a recipe.
 *
 * Those two components are gone in v3 and the MDX renderer reaches for
 * `<List.Root as="ul">` instead. That is the right replacement for the markup,
 * but it is not the same component: v2's UnorderedList was
 * `<List as="ul" styleType="initial" marginStart="1em">` and OrderedList was
 * the same with `decimal`, so the indent was part of the component, not part of
 * the call site. Every bulleted list in the docs loses 16px of indent when the
 * component does.
 *
 * `display` is the second half. A plain <ul> is a block box and v2 left it
 * alone; v3's root is `display: flex` with `flexDirection: column`. It happens
 * to look similar because the list items are full width, but it is not the same
 * box.
 *
 * A flat `marginInlineStart` rather than one scoped to `&:is(ul, ol)`, so that
 * a call site can still override it with a prop. DocsIndex does exactly that
 * with `marginInlineStart="2em"`, and a scoped selector would outrank it.
 */
export const listSlotRecipe = defineSlotRecipe({
  slots: ['root', 'item', 'indicator'],
  base: {
    root: { display: 'block', marginInlineStart: '1em' }
  }
});

/**
 * v2's Kbd base, in the four places v3's differs. Measured on the `/` badge in
 * the search button, which is the only Kbd the site renders.
 *
 * v2 sized the glyph relative to its context with `fontSize: '0.8em'` and
 * `px: '0.4em'`, and left `lineHeight: 'normal'`. v3 sets none of the three, so
 * the badge inherits the button's full 14px, takes the button's 20px line box,
 * and shrinks its padding to a flat 4px. `wordSpacing` is v3's own addition.
 */
export const kbdRecipe = defineRecipe({
  base: {
    fontSize: '0.8em',
    lineHeight: 'normal',
    px: '0.4em',
    wordSpacing: 'normal'
  },
  // v3 gave Kbd a size axis that v2 did not have, and every entry in it sets a
  // textStyle and a fixed height. Both have to go for the base above to be
  // reachable: the textStyle for the same reason as in buttonRecipe, the height
  // because v2's badge was as tall as its own content.
  variants: {
    size: Object.fromEntries(
      ['sm', 'md', 'lg'].map(size => [size, { textStyle: '', height: 'auto' }])
    )
  }
});

/**
 * v2's Divider is v3's Separator, and it lost the one declaration the site
 * relied on.
 *
 * v2's baseStyle was `{opacity: 0.6, borderColor: 'inherit'}`
 * (@chakra-ui/theme components/divider.js). v3's is
 * `{display: 'block', borderColor: 'border'}`. The colour resolves to the same
 * grey in both, so only the opacity actually moved, and it moved on all eight
 * dividers in the site that do not name their own. Call sites that set
 * `opacity` themselves, such as the 0.2 rule at the foot of the app footer,
 * were never affected and are not affected by this either.
 */
export const separatorRecipe = defineRecipe({
  base: { opacity: 0.6 }
});

/**
 * v2's Breadcrumb declared almost nothing: one base slot, `link`, carrying
 * `color: 'inherit'` (@chakra-ui/theme components/breadcrumb.js). Everything
 * the crumbs looked like came from the page around them.
 *
 * v3's recipe is opinionated where v2's was empty, and three of its opinions
 * are visible on the docs page:
 *
 *   list.color      `fg.muted`, so the separator chevrons go from the body's
 *                   gray.800 to gray.600. The crumb links themselves do not
 *                   change, because MainBreadcrumb passes an explicit colour
 *                   for both the active and the inactive state.
 *   size.md.list    `textStyle: sm`, and a v3 textStyle is a pair, so it brings
 *                   `lineHeight: 1.25rem`. 20px where v2 inherited the unitless
 *                   1.5 and computed 21px at 14px.
 *   size.md.list    `gap: 1.5` (6px). v2 had no gap and spaced the crumbs with
 *                   `mx` on the separator instead, from Breadcrumb's `spacing`
 *                   prop, which defaults to 0.5rem. 8px on each side, which is
 *                   `gap: 2` here.
 *
 * `separator.opacity` is v3's too. v2's separator had none.
 */
export const breadcrumbSlotRecipe = defineSlotRecipe({
  slots: [
    'link',
    'currentLink',
    'item',
    'list',
    'root',
    'ellipsis',
    'separator'
  ],
  // `gap` and `lineHeight` have to sit in the size variant, not in `base`: v3
  // declares both inside `size`, and a variant is applied after the base it
  // would otherwise be overriding.
  base: {
    list: { color: 'inherit' },
    separator: { color: 'inherit', opacity: 1 }
  },
  variants: {
    size: Object.fromEntries(
      ['sm', 'md', 'lg'].map(size => [
        size,
        { list: { gap: 2, lineHeight: 1.5 } }
      ])
    )
  }
});

export const tooltipSlotRecipe = defineSlotRecipe({
  slots: ['content'],
  base: {
    content: {
      borderRadius: 'md',
      bgColor: 'components.tooltip.bgColor',
      color: 'shared.text.default'
    }
  }
});

/**
 * v2's `container` slot is v3's `root`. All four variants are reachable through
 * `<Alert variant={type}>` in Callouts.tsx, which is the whole point of the
 * component: docs pages render callouts by type.
 */
export const alertSlotRecipe = defineSlotRecipe({
  slots: ['root', 'title', 'description', 'indicator', 'content'],
  variants: {
    variant: Object.fromEntries(
      ['default', 'info', 'warning', 'error'].map(kind => [
        kind,
        {
          root: {
            border: '1px solid',
            bgColor: `components.callout.${kind}.container.bgColor`,
            borderColor: `components.callout.${kind}.container.borderColor`,
            color: `components.callout.${kind}.container.color`
          }
        }
      ])
    )
  }
});

/**
 * v2's item/button/panel are v3's item/itemTrigger/itemContent.
 *
 * The four `textAlign`/`fontSize` declarations are the site's own, ported
 * unchanged. Everything else here restores a v2 base that v3 either dropped or
 * replaced, and none of it was written down in v2 for the usual reason: the
 * site never overrode it, so there was nothing to port.
 *
 * v2's accordion `button` base was `{fontSize: 'md', px: 4, py: 2}` and its
 * `panel` base was `{pt: 2, px: 4, pb: 5}` (@chakra-ui/theme
 * components/accordion.js). v3 keeps `py` but moves it into the `size` variant,
 * drops `px` from every variant except `subtle` and `enclosed`, moves the
 * panel's padding off the panel and onto the `itemBody` inside it, and adds
 * `fontWeight: medium` and `gap: 3` to the trigger that v2 never had.
 *
 * `lineHeight` is the one that moves the nav. v3's default `size` is `md`,
 * whose itemTrigger is `{textStyle: 'md', py: ...}`, and `textStyle: md` is a
 * pair: `fontSize: md` AND `lineHeight: 1.5rem`. The leftNav variant is applied
 * after `size` and its `fontSize: 'sm'` wins the first half, so the trigger
 * ends up as 14px text in a 24px line box. v2's trigger declared no
 * line-height at all and inherited the unitless 1.5 off the body, which at 14px
 * is 21px. A unitless value here restores the recomputation, so a future
 * fontSize change keeps its own leading.
 *
 * `itemIndicator` needs two things v2 got for free. Its colour: v3 paints the
 * chevron `fg.subtle` where v2's AccordionIcon inherited. And `display: flex`,
 * which is what makes the arrow land on v2's pixel: v2 put the `rotate(-90deg)`
 * straight on a 17.5px square <svg>, so the rotation was about the glyph's own
 * centre, while v3 wraps the icon in a block-level indicator whose height is
 * the 21px line box, so a 17.5x21 rectangle spins and lands the glyph three
 * quarters of a pixel off. A flex box shrink-wraps the icon and the two
 * rotations agree again.
 */
export const accordionSlotRecipe = defineSlotRecipe({
  slots: [
    'root',
    'item',
    'itemTrigger',
    'itemContent',
    'itemBody',
    'itemIndicator'
  ],
  variants: {
    variant: {
      leftNav: {
        root: { fontSize: 'sm' },
        item: { borderWidth: 0 },
        itemTrigger: {
          textAlign: 'left',
          fontSize: 'sm',
          lineHeight: 1.5,
          fontWeight: 'normal',
          px: 4,
          gap: 0
        },
        itemContent: {
          paddingTop: 0,
          paddingRight: 0,
          fontSize: 'sm',
          /**
           * v2's `reduceMotion`, and the 4px it was quietly worth.
           *
           * PageDirectory passed `reduceMotion` to v2's Accordion on purpose,
           * with a comment: a panel toggled while the nav is hidden measures an
           * open height of 0 and gets stuck expanded but invisible. v3 has no
           * such prop and drives the collapse from the recipe instead, so the
           * guard is reinstated here by taking the animation away.
           *
           * `overflow` is the half that shows up in a screenshot. v3 pairs the
           * animation with `overflow: hidden`, which makes itemContent a block
           * formatting context, and a BFC traps the margins of the items inside
           * it. Every nested entry carries `my={1}`, so the first one's 4px and
           * the last one's 4px stop collapsing out of the panel the way they did
           * through v2's `overflow: visible` one, and each expanded section
           * pushes the rest of the nav 4px down. With no animation left to clip,
           * visible is both correct and free.
           */
          overflow: 'visible',
          _open: { animationName: 'none' },
          _closed: { animationName: 'none' }
        },
        itemBody: { paddingTop: 0, paddingRight: 0, paddingLeft: 4 },
        itemIndicator: { color: 'inherit', display: 'flex' }
      }
    }
  }
});

/**
 * v2's Avatar size scale, restored for the one size the site uses.
 *
 * v2 built every size with `getSize(n)`: `--avatar-size: sizes.n` and
 * `--avatar-font-size: calc(sizes.n / 2.5)`. `md` was `getSize(12)`, so 3rem
 * with a 1.2rem label. v3's `md` is `sizes.10` with `fontSizes.md`, so 2.5rem
 * with a 1rem label, and v3's `xl` is not a substitute either: it gives the
 * 3rem box back but labels it 1.125rem.
 *
 * All six Avatars in the site are `md`, three by name and three by default, and
 * they are the same author avatar rendered in four places. Two of those places
 * had already been patched at the call site with this exact pair of custom
 * properties, which is what made the omission in the two experiment-page
 * avatars visible: the same person's avatar was 48px on the user card and 40px
 * on the experiment beside it. Declaring it once here is what stops that
 * drifting again, and the call-site patches come back out.
 *
 * The other sizes are left at v3's. Nothing selects them, and inventing v2
 * values for scales the site never rendered would be guessing.
 */
export const avatarSlotRecipe = defineSlotRecipe({
  slots: ['root', 'image', 'fallback'],
  variants: {
    size: {
      md: {
        root: {
          '--avatar-size': 'sizes.12',
          '--avatar-font-size': 'calc(3rem / 2.5)'
        }
      }
    }
  }
});

/**
 * v2's Card surface, restored in dark mode.
 *
 * v2's card container was `--card-bg: colors.chakra-body-bg`, which is
 * `{white, _dark: gray.800}` — the same pair the body itself uses, so a card
 * sat flush with the page and was told apart by its border alone. v3's outline
 * variant uses `bg: bg.panel`, whose dark half is gray.950 (#111111), and pairs
 * it with `borderColor: border`, whose dark half is gray.800 (#1A202C). In dark
 * mode that turns the card into a near-black panel against a gray.800 page and
 * draws its border in almost exactly the page's own colour, which is to say
 * invisibly.
 *
 * Light mode was already right in both and is left alone. Five cards are
 * affected: both post cards, the user card, the docs image card and the qasm
 * playground.
 */
export const cardSlotRecipe = defineSlotRecipe({
  slots: ['root', 'header', 'body', 'footer', 'title', 'description'],
  variants: {
    variant: {
      outline: {
        root: {
          bg: { base: 'white', _dark: 'gray.800' },
          borderColor: { base: 'gray.200', _dark: 'whiteAlpha.300' }
        }
      }
    }
  }
});

/**
 * `theme-hover` has no literal call site but is the default variant, so it
 * reaches every menu in the site. `search-result` was the other half of v2's
 * recipe and has none: the search menu never selected it.
 */
export const menuSlotRecipe = defineSlotRecipe({
  slots: ['content', 'item', 'itemGroupLabel'],
  variants: {
    variant: {
      'theme-hover': {
        item: {
          _hover: {
            bgColor: 'leftNav.bottomNav.menu.item.active.bgColor',
            color: 'leftNav.bottomNav.menu.item.active.textColor'
          },
          _focus: {
            bgColor: 'leftNav.bottomNav.menu.item.active.bgColor',
            color: 'leftNav.bottomNav.menu.item.active.textColor'
          },
          transition:
            'background-color 0.1s ease-in-out, color 0.1s ease-in-out'
        }
      }
    }
  },
  defaultVariants: { variant: 'theme-hover' }
});
