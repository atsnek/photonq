const smtSearchFeature = {
  menuList: {
    bgColor: {
      default: 'white',
      _dark: 'gray.800'
    }
  },
  input: {
    borderColor: {
      default: 'brand.400',
      _dark: 'brand.600'
    },
  },
  section: {
    title: {
      color: {
        default: 'gray.500',
        _dark: 'gray.400'
      }
    },
    item: {
      icon: {
        color: {
          default: 'gray.500',
          _dark: 'gray.500'
        }
      },
      goto: {
        color: {
          default: 'gray.500',
          _dark: 'gray.400'
        },
      },
      _hover: {
        bgColor: {
          default: 'gray.100',
          _dark: 'gray.600'
        },
        color: {
          default: 'brand.500',
          _dark: 'brand.300'
        },
      },
    },
  },
  noResults: {
    text: {
      color: {
        default: 'gray.500',
        _dark: 'gray.400'
      }
    }
  }
};

export default smtSearchFeature;
