import { ComponentStyleConfig } from '@chakra-ui/react';

const themeTextareaComponent: ComponentStyleConfig = {
  variants: {
    ghost: {
      bgColor: 'transparent',
      border: '1px solid',
      borderColor: 'transparent',
      _focus: {
        borderColor: 'components.textarea.variants.ghost._focus.borderColor'
      }
    }
  }
};

export default themeTextareaComponent;
