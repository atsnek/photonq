import { ComponentStyleConfig } from '@chakra-ui/react';

//TODO: Get this to work
const themeInputComponent: ComponentStyleConfig = {
  baseStyle: {
    field: {
      // borderColor: 'gray.500',
    }
  },
  variants: {
    ghost: {
      field: {
        bgColor: 'transparent',
        border: '1px solid',
        borderColor: 'transparent',
        _focus: {
          borderColor:
            'brand.500'
        }
      }
    }
  }
};

export default themeInputComponent;
