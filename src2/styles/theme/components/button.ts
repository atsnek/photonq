import { ComponentStyleConfig } from '@chakra-ui/react';

const themeButtonComponent: ComponentStyleConfig = {
  variants: {
    solid: {
      textTransform: 'capitalize',
    },
    invisible: {
      textTransform: 'capitalize',
      bgColor: 'transparent',
      border: 'none',
      _hover: {
        bgColor: 'transparent',
        border: 'none'
      },
      _focus: {
        bgColor: 'transparent',
        border: 'none',
        outline: 'none'
      },
      cursor: 'default',
      paddingInline: 3
    },
    'ghost-hover': {
      textTransform: 'capitalize',
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
      textTransform: 'capitalize',
      bgColor: 'transparent',
      opacity: 0.5,
      _hover: {
        color: 'components.button.ghostHoverOpacity.active.color',
        opacity: 1
      }
    },
    'outline-hover-filled': {
      textTransform: 'capitalize',
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
      textTransform: 'capitalize',
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
      textTransform: 'capitalize',
      bgColor: 'rgba(2, 116, 192, 0.07)',
      border: '1px solid',
      borderColor: 'brand.500',
      color: 'brand.500',
      px: 5,
      borderRadius: 'lg',
      _hover: {
        bgColor: 'brand.600',
        color: 'white',
        transform: 'scale(1.05)'
      },
      transition:
        'background-color 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease-in-out'
    },
    'pq-solid': {
      textTransform: 'capitalize',
      bgColor: 'brand.500',
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
      textTransform: 'capitalize',
      bgColor: 'transparent',
      color: 'brand.500',
      px: 5,
      borderRadius: 'lg',
      _hover: {
        transform: 'scale(1.1)'
      }
    },
    // COLOR VARIANTS
    //TODO: Find a better way to do this (we need the colorScheme to use other color values than f.e. 500 & 600 by default)
    filledGreen: {
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
    filledYellow: {
      color: 'components.button.filledYellow.color',
      bgColor: 'components.button.filledYellow.bgColor',
      _hover: {
        bgColor: 'components.button.filledYellow.hover.bgColor'
      },
      _loading: {
        color: 'white',
        opacity: 1,
        bgColor: 'components.button.filledYellow.loading.bgColor',
        _hover: {
          bgColor: 'components.button.filledYellow.loading.bgColor'
        }
      }
    },
    filledRed: {
      color: 'components.button.filledRed.color',
      bgColor: 'components.button.filledRed.bgColor',
      _hover: {
        bgColor: 'components.button.filledRed.hover.bgColor'
      },
      _loading: {
        color: 'white',
        opacity: 1,
        bgColor: 'components.button.filledRed.loading.bgColor',
        _hover: {
          bgColor: 'components.button.filledRed.loading.bgColor'
        }
      }
    }
  }
};

export default themeButtonComponent;
