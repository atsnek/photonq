import { CloseButton, Dialog } from '@chakra-ui/react';
import { FC } from 'react';

/**
 * v2's `<ModalCloseButton/>`, rebuilt on v3's parts.
 *
 * Two things had to be restored, and they are separate problems.
 *
 * 1. v3's `<Dialog.CloseTrigger/>` draws NOTHING of its own — it is a bare ark
 *    button and the `closeTrigger` slot only positions it. Left childless (as
 *    the codemod left both of the site's dialogs) it renders an empty,
 *    unlabelled button and the modal simply has no visible X. v2's
 *    ModalCloseButton delegated to CloseButton, so one is handed to it here.
 *
 * 2. Handing it a plain `<CloseButton/>` is not enough either. In v2 CloseButton
 *    was its own theme key and was untouched by the site's Button styleConfig.
 *    In v3 CloseButton IS an IconButton, so it inherits the site's `ghost`
 *    button variant (styles/theme/recipes.ts), which sets `px: 5`,
 *    `borderRadius: xl` and `opacity: 0.7`. Unpinned, the 2rem square X becomes
 *    a 3.5rem-wide, heavily rounded, half-faded pill.
 *
 * Every value below is read off the v2 rule, captured by rendering the v2
 * ContactModal from the untouched checkout:
 *
 *   width/height   var(--close-button-size) = sizes.8 (2rem)
 *   border-radius  radii.md
 *   font-size      fontSizes.xs   -> the icon is 1em, i.e. 12px
 *   background     transparent, blackAlpha.100 on hover, .200 on active
 *                  (whiteAlpha in dark mode)
 *   position       absolute, top space.2, right space.3
 *
 * `insetEnd` is the one that lives on the trigger rather than the button:
 * v3's dialog recipe positions the slot at insetEnd 2 where v2's modal used 3.
 *
 * KNOWN RESIDUE: the site's ghost variant also tints `_focus` (not just
 * `_focusVisible`), so a mouse click leaves the button tinted until it blurs,
 * where v2 only drew a focus ring for keyboard users. Closing that would mean
 * changing the shared ghost variant, which is a theme change, not this one.
 */
export const DialogCloseButton: FC = () => (
  <Dialog.CloseTrigger asChild insetEnd="3">
    <CloseButton
      size="xs"
      boxSize="8"
      px="0"
      borderRadius="md"
      opacity={1}
      // `bgColor`, not `bg`: the site's ghost variant spells its hover colour
      // as `bgColor`, so a `bg` here lands as the `background` shorthand and
      // loses to the variant's later `background-color` longhand in the same
      // rule. Same key, and the prop overwrites it in the merge.
      _hover={{ bgColor: { base: 'blackAlpha.100', _dark: 'whiteAlpha.100' } }}
      _active={{
        bgColor: { base: 'blackAlpha.200', _dark: 'whiteAlpha.200' }
      }}
      // v2's close button tinted on hover and on press, never on plain focus;
      // the keyboard affordance was the focus ring alone. The site's ghost
      // variant tints `_focus`, which would leave the X shaded after a mouse
      // click until it blurs.
      _focus={{ bgColor: 'transparent' }}
      // v3's button recipe sizes icons through `& :where(svg)`: a fixed
      // sizes.4 (16px) and, less obviously, `font-size: 1.2em`. v2's CloseIcon
      // was plain 1em of the button's own fontSize xs, i.e. 12px, so the
      // 1.2em has to be cancelled as well or 1em resolves to 14.4px. A real
      // `& svg` (0,1,1) outranks `:where(svg)` (0,1,0), so this wins
      // deterministically rather than by source order.
      css={{ '& svg': { fontSize: '1em', width: '1em', height: '1em' } }}
    />
  </Dialog.CloseTrigger>
);
