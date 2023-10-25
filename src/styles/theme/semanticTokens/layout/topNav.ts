const smtTopNav = {
  light: {
    GitHubFill: {
      default: 'black'
    }
  },
  dark: {
    GitHubFill: {
      default: 'white'
    }
  },
  borderColor: {
    default: 'rgb(229, 231, 235)',
    _dark: 'gray.700'
  },
  GitHubFill: {
    default: 'black',
    _dark: 'white'
  },
  input: {
    focus: {
      bgColor: {
        default: 'white',
        _dark: 'gray.900'
      },
      borderColor: {
        default: 'theme.500',
        _dark: 'theme.600'
      }
    },
    borderColor: {
      default: 'gray.300',
      _dark: 'gray.500'
    },
    color: {
      default: 'gray.800',
      _dark: 'gray.400',
    },
    kbd: {
      color: {
        default: 'rgb(107, 114, 128)',
        _dark: 'gray.400'
      }
    }
  },
  mobile: {
    hamburger: {
      bgColor: {
        default: 'gray.800',
        _dark: 'gray.200'
      }
    },
    menu: {
      sectionIconColor: {
        default: 'gray.400',
        _dark: 'gray.600'
      }
    }
  },
  tabs: {
    active: {
      color: {
        default: 'brand.500',
        _dark: 'brand.500'
      }
    }
  },
  links: {
    active: {
      color: {
        default: 'theme.500',
        _dark: 'theme.600'
      }
    }
  }
};

export default smtTopNav;
