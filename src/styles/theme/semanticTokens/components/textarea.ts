const smtTextareaComponent = {
  borderColor: {
    default: 'gray.300',
    _dark: 'gray.600'
  },
  _focus: {
    borderColor: {
      default: 'brand.500',
      _dark: 'brand.600'
    }
  },
  _hover: {
    borderColor: {
      default: 'gray.300',
      _dark: 'gray.500'
    },
  },
  variants: {
    ghost: {
      a: 'b',
      _focus: {
        borderColor: {
          default: 'gray.300',
          _dark: 'gray.500'
        }
      }
    }
  }
};

export default smtTextareaComponent;
