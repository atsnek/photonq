import { ComponentStyleConfig } from "@chakra-ui/react";

const themeButtonComponent: ComponentStyleConfig = {
  variants: {
    'ghost-hover': {
      bgColor: 'transparent',
      opacity: 0.7,
      _hover: {
        bgColor: 'components.button.ghost.hover.bgColor',
        opacity: 1
      },
      _focus: {
        bgColor: 'components.button.ghost.hover.bgColor',
        opacity: 1
      }
    },
    'ghost-hover-opacity': {
      bgColor: 'transparent',
      opacity: 0.5,
      _hover: {
        color: 'components.button.ghostHoverOpacity.active.color',
        opacity: 1
      }
    },
    'outline-hover-filled': {
      bgColor: 'transparent',
      border: '1px solid',
      borderColor: 'components.button.outline.borderColor',
      color: 'components.button.outline.color',
      _hover: {
        bgColor: 'components.button.outline.hover.bgColor',
        borderColor: 'components.button.outline.hover.borderColor',
        color: 'components.button.outline.hover.color',
        boxShadow: '4px 4px 7px -5px rgba(2, 116, 192, 0.5)'
      },
      transition:
        'background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out'
    },
    'ghost-hover-outline': {
      bgColor: 'transparent',
      border: '1px solid',
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
      bgColor: 'rgba(2, 116, 192, 0.07)',
      border: '1px solid',
      borderColor: 'pq.500',
      color: 'pq.500',
      px: 5,
      borderRadius: 'lg',
      _hover: {
        bgColor: 'rgba(2, 116, 192, 1)',
        color: 'white',
        transform: 'scale(1.05)'
      },
      transition:
        'background-color 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease-in-out'
    },
    'pq-solid': {
      bgColor: 'pq.500',
      color: 'white',
      px: 5,
      borderRadius: 'lg',
      _hover: {
        transform: 'scale(1.05)',
        boxShadow: '3x 3px 10px rgba(2, 116, 192, 0.5)'
      },
      transition:
        'background-color 0.2s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
    },
    'pq-ghost': {
      bgColor: 'transparent',
      color: 'pq.500',
      px: 5,
      borderRadius: 'lg',
      _hover: {
        transform: 'scale(1.1)'
      },
    },
    // COLOR VARIANTS
    //TODO: Find a better way to do this (we need the colorScheme to use other color values than f.e. 500 & 600 by default)
    'filledGreen': {
      color: 'components.button.filledGreen.color',
      bgColor: 'components.button.filledGreen.bgColor',
      _hover: {
        bgColor: 'components.button.filledGreen.hover.bgColor'
      },
      _loading: {
        color: 'white',
        opacity: 1,
        bgColor: 'components.button.filledGreen.loading.bgColor',
        _hover: {
          bgColor: 'components.button.filledGreen.loading.bgColor'
        }
      }
    },
  },
};

export default themeButtonComponent;
