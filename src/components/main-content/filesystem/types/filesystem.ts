import { PlacementWithLogical } from '@chakra-ui/react';

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
        bgColor?: string;
        color?: string;
        placement?: PlacementWithLogical;
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
