const smtTextareaComponent = {
  _focus: {
    borderColor: {
      default: 'brand.500',
      _dark: 'brand.600'
    }
  },
  _hover: {
    borderColor: {
      default: 'gray.300',
      _dark: 'gray.600'
    },
  },
  variants: {
    ghost: {
      a: 'b',
      _focus: {
        borderColor: {
          default: 'gray.300',
          _dark: 'gray.600'
        }
      }
    }
  }
};

export default smtTextareaComponent;
