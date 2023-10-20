const smtUserProfilePage = {
  leftNav: {
    username: {
      color: {
        inactive: {
          default: 'gray.500',
          _dark: 'gray.500'
        },
        hover: {
          default: 'brand.700',
          _dark: 'brand.400'
        }
      }
    },
    socialLinks: {
      icon: {
        color: {
          default: 'gray.500',
          _dark: 'gray.400'
        }
      },
      text: {
        hover: {
          color: {
            default: 'brand.700',
            _dark: 'brand.400'
          }
        }
      }
    },
    bio: {
      color: {
        default: 'gray.700',
        _dark: 'gray.400'
      },
      editor: {
        borderColor: {
          default: 'brand.500',
          _dark: 'brand.500'
        }
      }
    },
    stats: {
      count: {
        color: {
          default: 'gray.700',
          _dark: 'gray.300'
        }
      },
      text: {
        color: {
          default: 'gray.600',
          _dark: 'gray.500'
        }
      },
      link: {
        a: 'b',
        _hover: {
          color: {
            default: 'brand.500',
            _dark: 'brand.500'
          }
        }
      }
    }
  },
  topNav: {
    tabs: {
      borderColor: {
        default: 'brand.500',
        _dark: 'brand.500'
      }
    }
  },
  rightNav: {
    tabs: {
      active: {
        color: {
          default: 'brand.700',
          _dark: 'brand.400'
        }
      }
    }
  }
};

export default smtUserProfilePage;
