const smtRightNav = {
  titleTop: {
    color: {
      default: 'gray.800',
      _dark: 'gray.200'
    }
  },
  link: {
    active: {
      color: {
        default: 'brand.500',
        _dark: 'brand.300'
      }
    },
    inactive: {
      // The table of contents dims its inactive entries to 0.7 opacity. In
      // dark mode gray.400 at that opacity read 4.3:1 on the gray.800 body,
      // just under 4.5:1. gray.300 reads 6.4:1 and still sits below the
      // active entry.
      color: {
        default: 'gray.800',
        _dark: 'gray.300'
      }
    }
  }
};

export default smtRightNav;
