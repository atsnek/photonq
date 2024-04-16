import { ComponentStyleConfig } from '@chakra-ui/react';

const themeInputGroupComponent: ComponentStyleConfig = {
  variants: {
    ghost: {
      field: {
        bgColor: 'transparent',
        border: '1px solid',
        borderColor: 'transparent',
        _focus: {
          borderColor:
            'components.input.variants.ghost._focus.field.borderColor'
        }
      },
      addon: {
        border: 'none',
        bgColor: 'transparent',
        _hover: {
          bgColor: 'gray.100'
        }
      }
    }
  }
};

export default themeInputGroupComponent;
