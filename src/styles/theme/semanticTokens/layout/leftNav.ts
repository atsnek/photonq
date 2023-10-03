const smtLeftNav = {
  accordion: {
    activeItem: {
      bgColor: {
        default: 'theme.100',
        _dark: 'theme.900'
      },
      hoverBgColor: {
        default: 'theme.100',
        _dark: 'theme.700'
      },
      button: {
        icon: {
          hoverContainerBgColor: {
            default: 'theme.200',
            _dark: 'theme.800'
          }
        },
        text: {
          color: {
            default: 'theme.800',
            _dark: 'theme.200'
          }
        }
      }
    },
    inactiveItem: {
      hoverBgColor: {
        default: 'gray.100',
        _dark: 'gray.700'
      },
      button: {
        icon: {
          hoverContainerBgColor: {
            default: 'gray.200',
            _dark: 'gray.600'
          }
        }
      }
    },
    panel: {
      borderLeftColor: {
        default: 'gray.200',
        _dark: 'gray.700'
      }
    }
  },
  bottomNav: {
    menu: {
      button: {},
      item: {
        active: {
          bgColor: {
            default: 'theme.100',
            _dark: 'theme.900'
          },
          textColor: {
            default: 'theme.800',
            _dark: 'theme.200'
          }
        }
      }
    }
  }
};

export default smtLeftNav;
