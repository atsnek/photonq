const smtButtonComponent = {
  ghost: {
    hover: {
      outline: {
        color: {
          default: 'theme.500',
          _dark: 'theme.500'
        }
      },
      bgColor: {
        default: 'gray.100',
        _dark: 'whiteAlpha.700'
      }
    }
  },
  ghostHoverOpacity: {
    active: {
      color: {
        default: 'theme.500',
        _dark: 'theme.500'
      }
    }
  },
  outline: {
    color: {
      default: 'theme.500',
      _dark: 'theme.500'
    },
    borderColor: {
      default: 'theme.500',
      _dark: 'theme.800'
    },
    hover: {
      borderColor: {
        default: 'theme.500',
        _dark: 'theme.800'
      },
      color: {
        default: 'white',
        _dark: 'gray.200'
      },
      bgColor: {
        default: 'theme.500',
        _dark: 'theme.800'
      }
    }
  },
  ghostHoverOutline: {
    color: {
      default: 'gray.500',
      _dark: 'gray.600'
    },
    hover: {
      borderColor: {
        default: 'theme.500',
        _dark: 'theme.800'
      },
      color: {
        default: 'theme.500',
        _dark: 'theme.500'
      },
    },
  },
  // COLOR VARIANTS
  filledGreen: {
    color: {
      default: 'gray.800',
      _dark: 'gray.200'
    },
    bgColor: {
      default: 'flat.se.green.500',
      _dark: 'flat.se.green.700'
    },
    hover: {
      bgColor: {
        default: 'flat.se.green.550',
        _dark: 'flat.se.green.600'
      },
    },
    loading: {
      bgColor: {
        default: 'flat.se.green.300',
        _dark: 'flat.se.green.400'
      },
    }
  },
};

export default smtButtonComponent;
