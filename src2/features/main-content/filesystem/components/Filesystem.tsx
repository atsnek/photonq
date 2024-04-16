import {
  Box,
  BoxProps,
  Tooltip,
  TooltipProps,
  useColorModeValue
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import BsFileEarmark from '../../../../shared/components/icons/bootstrap/BsFileEarmark';
import BsFolder2Open from '../../../../shared/components/icons/bootstrap/BsFolder2Open';
import BsFolder from '../../../../shared/components/icons/bootstrap/BsFolder';
import { TFilesystemItem } from '../types/filesystem';
import { mainComponentBaseStyle } from '../../../../shared/containers/main/mainContent.vars';

interface IFilesystemItemProps {
  item: TFilesystemItem;
  intendation: number;
  isChild?: boolean;
}
/**
 * A single item in the filesystem
 */
const FilesystemItem: FC<IFilesystemItemProps> = ({
  item,
  intendation,
  isChild
}) => {
  const isFolder = item.type === 'folder';

  const [showChildren, setShowChildren] = useState(
    isFolder && (item.defaultOpen ?? true)
  );
  const toggleShowChildren = () => setShowChildren(!showChildren);
  //!Bug: Chakra doesnt set the bg color via the background-color css prop but via the bg prop, which allows our default tooltip props to take precedence. This is a temporary workaround
  const tooltipBgColor = useColorModeValue('theme.700', 'theme.800');

  // Tooltip sttings
  const tooltipText =
    typeof item.tooltip === 'string' ? item.tooltip : item.tooltip?.text;
  let tooltipProps: TooltipProps = {
    label: tooltipText,
    bgColor: 'components.filesystem.tooltip.bgColor',
    color: 'components.filesystem.tooltip.color',
    borderRadius: 'md',
    placement: 'right',
    children: undefined
  };
  if (typeof item.tooltip === 'object') {
    tooltipProps = {
      ...tooltipProps,
      ...item.tooltip
    };
  }

  // Icon settings
  let IconComp;
  let props: BoxProps = { transition: 'opacity 0.2s ease-in-out' };
  if (isFolder) {
    props = {
      ...props,
      cursor: 'pointer',
      _hover: { ...props._hover, opacity: 0.7 }
    };
    IconComp = showChildren ? BsFolder2Open : BsFolder;
  } else {
    props.cursor = tooltipText ? 'pointer' : 'default';
    IconComp = BsFileEarmark;
  }

  // Colorization settings
  if (item.isSelected) {
    const color = `components.filesystem.selected.color.${
      item.lowContrast ? 'lowContrast' : 'default'
    }`;
    props = {
      ...props,
      color,
      fill: color
    };
  } else {
    const color = `components.filesystem.color.${
      item.lowContrast ? 'lowContrast.initial' : 'default'
    }`;
    props = {
      ...props,
      color,
      fill: color
    };
  }

  if (item.lowContrast) {
    props = {
      ...props,
      opacity: 0.5,
      _hover: {
        ...props._hover,
        opacity: 1
      }
    };
  }

  if (isChild) {
    props = {
      ...props,
      position: 'relative',
      _before: {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: intendation * -3,
        transform: 'translateY(-50%)',
        height: '1px',
        width: 2,
        bg: 'components.filesystem.'
      }
    };
  }

  const itemContent = (
    <Box w="fit-content">
      <IconComp
        boxSize="14px"
        mr={2}
        fill="components.filesystem.icon.color"
        color="components.filesystem.icon.color"
      />
      {item.name}
    </Box>
  );

  return (
    <Box ml={intendation * 3} mb={1}>
      <Box
        {...props}
        onClick={toggleShowChildren}
        key={0}
        mb={1}
        // color={item.isSelected ? 'components.filesystem.selected.color' : 'components.filesystem.color'}
      >
        {tooltipText && tooltipText.length ? (
          <Tooltip
            {...tooltipProps}
            label={tooltipText}
            bgColor={`${tooltipBgColor} !important`}
            borderRadius="md"
            openDelay={500}
          >
            {itemContent}
          </Tooltip>
        ) : (
          itemContent
        )}
      </Box>
      {item.type === 'folder' && showChildren && (
        <Box
          borderLeft="1px solid"
          borderColor="leftNav.accordion.panel.borderLeftColor"
        >
          {item.children?.map((child, i) => (
            <FilesystemItem
              item={child}
              intendation={intendation + 1}
              key={i}
              isChild
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export interface IFileSystemProps {
  structure: TFilesystemItem[];
}
/**
 * Filesystem component for displaying filesystem structures.
 */
const Filesystem: FC<IFileSystemProps> = ({ structure }) => {
  return (
    <Box
      {...mainComponentBaseStyle.baseProps}
      w="fit-content"
      px={5}
      py={3}
      border="1px solid"
      borderColor="components.filesystem.borderColor"
      borderRadius="md"
      color="shared.text.default"
      fontSize="sm"
      _hover={{
        boxShadow: 'base'
      }}
      transition="box-shadow 0.2s ease-in-out"
    >
      {structure &&
        Array.isArray(structure) &&
        structure?.map((item, i) => (
          <FilesystemItem item={item} intendation={0} key={i} />
        ))}
    </Box>
  );
};
Filesystem.defaultProps = {
  structure: [
    {
      name: 'src',
      type: 'folder',
      defaultOpen: true,
      children: [
        {
          name: 'features',
          type: 'folder',
          defaultOpen: true,
          children: [
            {
              name: 'index.tsx',
              type: 'file',
              isSelected: true
            }
          ]
        },
        {
          name: 'apples.tsx',
          type: 'file',
          tooltip: {
            text: 'This is a tooltip'
          }
        },
        {
          name: 'bananas.tsx',
          type: 'file'
        },
        {
          name: 'strawberries.tsx',
          type: 'file'
        }
      ]
    }
  ]
};

export default Filesystem;
