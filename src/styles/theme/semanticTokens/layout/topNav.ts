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
        default: 'brand.500',
        _dark: 'brand.600'
      }
    },
    hover: {
      borderColor: {
        default: 'brand.400',
        _dark: 'brand.600'
      },
    },
    active: {
      bgColor: {
        default: 'gray.100',
        _dark: 'gray.700'
      },
    },
    // The dark halves of these two are read on the near-black top bar
    // (#111319 once its 70% black is laid over the page). gray.700 drew the
    // search box and the Sign Up box at 1.5:1, barely there. gray.600 is
    // 2.5:1. White at 0.4 for the label was 3.75:1, under the 4.5:1 a 14px
    // label needs; at 0.6 it is 7.1:1, the same dimming as the nav links.
    borderColor: {
      default: 'gray.300',
      _dark: 'gray.600'
    },
    color: {
      default: 'gray.800',
      _dark: 'rgba(255, 255, 255, 0.6)',
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
      // Text on the bar, so the contrast-checked text token. The old dark
      // half, brand.600, was 2.7:1 on the dark bar.
      color: {
        default: 'shared.text.brand'
      }
    }
  }
};

export default smtTopNav;
