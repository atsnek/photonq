import { TooltipRootProps } from '@chakra-ui/react';

/**
 * v3 dropped PlacementWithLogical along with the popper it came from. A
 * tooltip's placement now travels inside Tooltip.Root's positioning object,
 * so that is where the type is read from.
 *
 * The set is narrower than v2's: the four `auto*` values are gone. Nothing in
 * the site passes one, and no filesystem structure sets `placement` at all.
 */
export type TooltipPlacement = NonNullable<
  NonNullable<TooltipRootProps['positioning']>['placement']
>;

export type FilesystemItemType = 'file' | 'folder';

export type TFilesystemItem = TFilesystemFolder | TFilesystemFile;

export type TFilesystemItemBase = {
  name: string;
  type: FilesystemItemType;
  isSelected?: boolean;
  tooltip?:
    | string
    | {
        text: string;
        // Inert, and was in v2 as well — see the note on Tooltip.Content in
        // Filesystem.tsx. Kept because narrowing this shape is an API break.
        bgColor?: string;
        color?: string;
        placement?: TooltipPlacement;
        hasArrow?: boolean;
      };
  lowContrast?: boolean;
};

export type TFilesystemFolder = TFilesystemItemBase & {
  type: 'folder';
  defaultOpen?: boolean;
  children?: Array<TFilesystemItem>;
};

export type TFilesystemFile = TFilesystemItemBase & {
  type: 'file';
};
