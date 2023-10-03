const smtShared = {
  translucent: {
    bgColor: {
      default: 'rgba(255, 255, 255, 0.8)',
      _dark: 'rgba(26, 32, 44, 0.8)'
    }
  },
  text: {
    default: {
      default: 'gray.800',
      _dark: 'gray.400'
    },
    bright: {
      default: 'gray.600',
      _dark: 'gray.300'
    }
  },
  body: {
    bgColor: {
      default: 'white',
      _dark: 'gray.800'
    }
  },
  scrollbar: {
    thumb: {
      bgColor: {
        default: 'gray.300',
        _dark: 'gray.700'
      },
      hover: {
        bgColor: {
          default: 'gray.400',
          _dark: 'gray.600'
        }
      }
    }
  }
};

export default smtShared;
