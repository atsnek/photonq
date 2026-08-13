import { Box, BoxProps, Portal, Tooltip } from '@chakra-ui/react';
import { FC, useState } from 'react';

import BsFileEarmark from '../../../icons/bootstrap/BsFileEarmark';
import BsFolder from '../../../icons/bootstrap/BsFolder';
import BsFolder2Open from '../../../icons/bootstrap/BsFolder2Open';
import { TFilesystemItem, TooltipPlacement } from '../types/filesystem';

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

  // Tooltip sttings
  const tooltipText =
    typeof item.tooltip === 'string' ? item.tooltip : item.tooltip?.text;
  // v2 spread these onto <Tooltip> and then re-stated label, bgColor,
  // borderRadius and openDelay after the spread, so an item's own tooltip
  // object only ever reached colour, placement and arrow.
  const tooltip = {
    color: 'components.filesystem.tooltip.color',
    placement: 'right' as TooltipPlacement,
    hasArrow: false,
    ...(typeof item.tooltip === 'object' ? item.tooltip : {})
  };

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
          <Tooltip.Root
            openDelay={500}
            positioning={{ placement: tooltip.placement }}
          >
            <Tooltip.Trigger asChild>{itemContent}</Tooltip.Trigger>
            <Portal>
              <Tooltip.Positioner>
                {/*
                  No bgColor here on purpose. v2 passed
                  `${useColorModeValue('theme.700','theme.800')} !important`,
                  which its css() could not read as a token: it emitted
                  `background-color: theme.700 !important` and the browser
                  dropped the whole declaration, so the tooltip has always worn
                  the recipe's components.tooltip.bgColor. v3 parses the
                  !important suffix and would resolve the token, which would
                  repaint the tooltip orange. Recolouring it is its own change.
                */}
                <Tooltip.Content color={tooltip.color} borderRadius="md">
                  {tooltip.hasArrow && (
                    <Tooltip.Arrow>
                      <Tooltip.ArrowTip />
                    </Tooltip.Arrow>
                  )}
                  {tooltipText}
                </Tooltip.Content>
              </Tooltip.Positioner>
            </Portal>
          </Tooltip.Root>
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
      mt="8"
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
