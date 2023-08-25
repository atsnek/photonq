const smtFilesystemComponent = {
  selected: {
    color: {
      default: {
        default: 'theme.800',
        _dark: 'theme.300'
      },
      lowContrast: {
        default: 'theme.600',
        _dark: 'theme.400'
      }
    }
  },
  color: {
    default: {
      default: 'gray.800',
      _dark: 'gray.300'
    },
    lowContrast: {
      default: 'gray.400',
      _dark: 'gray.600'
    }
  },
  icon: {
    color: {
      default: {
        default: 'gray.700',
        _dark: 'gray.400'
      },
      lowContrast: {
        default: 'gray.500',
        _dark: 'gray.500'
      }
    }
  },
  borderColor: {
    default: 'gray.200',
    _dark: 'gray.700'
  },
  tooltip: {
    bgColor: {
      default: 'theme.700',
      _dark: 'theme.800'
    },
    color: {
      default: 'white',
      _dark: 'gray.200'
    }
  }
};

export default smtFilesystemComponent;
