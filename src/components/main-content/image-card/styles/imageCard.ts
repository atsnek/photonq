const smtImageCardComponent = {
  bgColor: {
    default: 'gray.100',
    _dark: 'gray.700'
  },
  borderColor: {
    default: 'gray.200',
    _dark: 'gray.600'
  },
  hover: {
    bgColor: {
      default: 'components.imageCard.bgColor',
      _dark: 'gray.600'
    },
    borderColor: {
      default: 'gray.300',
      _dark: 'gray.500'
    },
    boxShadow: {
      default: 'md',
      _dark: 'none'
    }
  }
};

export default smtImageCardComponent;
