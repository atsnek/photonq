const smtTextareaComponent = {
  a: 'b', // Remove after adding another property (otherwise _focus won't work)
  _focus: {
    borderColor: {
      default: 'theme.500',
      _dark: 'theme.600'
    }
  },
  variants: {
    ghost: {
      a: 'b',
      _focus: {
        borderColor: {
          default: 'gray.300',
          _dark: 'gray.600'
        },
      },
    },
  },
};

export default smtTextareaComponent;
