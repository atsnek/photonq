const smtRatingFeature = {
  unrated: {
    color: {
      default: 'gray.400',
      _dark: 'gray.500'
    }
  },
  rated: {
    color: {
      default: 'flat.nl.sunflower',
      _dark: 'yellow.600'
    }
  },
  disabled: {
    color: {
      default: 'gray.400',
      _dark: 'gray.400'
    }
  },
  _hover: {
    color: {
      default: 'flat.nl.sunflower',
      _dark: 'yellow.600'
    },
    bgColor: {
      default: 'gray.50',
      _dark: 'gray.700'
    },
    highContrast: {
      bgColor: {
        default: 'gray.100',
        _dark: 'gray.700'
      }
    }
  }
};

export default smtRatingFeature;
