const smtMain = {
  breadcrumb: {
    // The dark halves mirror the light ones: the current page brightest,
    // the trail behind it dimmer, and the hover back up to the current
    // page's colour. The trail was gray.600 on the gray.800 body, 2.2:1, and
    // gray.400 is 7.2:1. The current page moves up to gray.200 so that it
    // still reads as the brighter of the two.
    active: {
      color: {
        default: 'gray.800',
        _dark: 'gray.200'
      }
    },
    inactive: {
      color: {
        default: 'gray.400',
        _dark: 'gray.400'
      },
      hover: {
        color: {
          default: 'gray.900',
          _dark: 'gray.200'
        }
      }
    }
  },
  bottomNav: {
    linkHoverColor: {
      default: 'theme.800',
      _dark: 'theme.300'
    }
  }
};

export default smtMain;
