const themeMenuComponent = {
  variants: {
    'theme-hover': {
      item: {
        _hover: {
          bgColor: 'leftNav.bottomNav.menu.item.active.bgColor',
          color: 'leftNav.bottomNav.menu.item.active.textColor'
        },
        _focus: {
          bgColor: 'leftNav.bottomNav.menu.item.active.bgColor',
          color: 'leftNav.bottomNav.menu.item.active.textColor'
        },
        transition: 'background-color 0.1s ease-in-out, color 0.1s ease-in-out'
      }
    },
    'search-result': {
      groupTitle: {
        color: 'gray.500',
        textTransform: 'uppercase',
        fontSize: 'xs'
      },
      list: {
        paddingLeft: 5,
        paddingRight: 5,
        // bgColor: 'shared.translucent.bgColor',
        bgColor: 'shared.body.bgColor',
        backdropFilter: 'blur(10px)'
      },
      item: {
        paddingLeft: 3,
        paddingRight: 3,
        mb: 2,
        _focus: {
          bgColor: 'components.menu.item.focus.bgColor',
          boxShadow: '0 0 0 2px #00bce6'
        },
        bgColor: 'transparent',
        borderRadius: 'md'
      }
    }
  },
  defaultProps: {
    variant: 'theme-hover'
  }
};

export default themeMenuComponent;
