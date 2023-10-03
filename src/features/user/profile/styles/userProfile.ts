const smtUserProfilePage = {
  leftNav: {
    username: {
      color: {
        inactive: {
          default: 'gray.500',
          _dark: 'gray.500'
        },
        hover: {
          default: 'theme.700',
          _dark: 'theme.400'
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
            default: 'theme.700',
            _dark: 'theme.400'
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
          default: 'theme.500',
          _dark: 'theme.500'
        }
      }
    },
    followers: {
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
      }
    }
  },
  topNav: {
    tabs: {
      borderColor: {
        default: 'theme.500',
        _dark: 'theme.500'
      }
    }
  },
  rightNav: {
    tabs: {
      active: {
        color: {
          default: 'theme.700',
          _dark: 'theme.400'
        }
      }
    }
  }
};

export default smtUserProfilePage;
