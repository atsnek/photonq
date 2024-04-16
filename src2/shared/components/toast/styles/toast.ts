const smtToastComponent = {
  status: {
    success: {
      color: {
        default: 'green.500',
        _dark: 'green.500'
      },
      bgColor: {
        default:
          'linear-gradient(90deg, rgb(12, 243, 135) 0%, rgba(255,255,255,0) 25%)',
        _dark:
          'linear-gradient(90deg, rgba(9,195,108, 0.8) 0%, rgba(255,255,255,0) 40%)'
      }
    },
    error: {
      color: {
        default: 'red.500',
        _dark: 'red.500'
      },
      bgColor: {
        default:
          'linear-gradient(90deg, rgba(255, 14, 0, 1) 0%, rgba(255,255,255,0) 25%)',
        _dark:
          'linear-gradient(90deg, rgba(255, 14, 0, 0.8) 0%, rgba(255,255,255,0) 40%)'
      }
    },
    warning: {
      color: {
        default: 'yellow.500',
        _dark: 'yellow.500'
      },
      bgColor: {
        default:
          'linear-gradient(90deg, rgba(255, 138, 0, 1) 0%, rgba(255,255,255,0) 25%)',
        _dark:
          'linear-gradient(90deg, rgba(255, 138, 0, 0.8) 0%, rgba(255,255,255,0) 40%)'
      }
    },
    info: {
      color: {
        default: 'blue.400',
        _dark: 'blue.400'
      },
      bgColor: {
        default:
          'linear-gradient(90deg, rgba(93, 97, 208, 0.5) 0%, rgba(255,255,255,0) 25%)',
        _dark:
          'linear-gradient(90deg, rgba(58, 62, 197, 0.8) 0%, rgba(255,255,255,0) 40%)'
      }
    }
  },
  description: {
    color: {
      default: 'gray.500',
      _dark: 'gray.400'
    }
  },
  container: {
    bgColor: {
      default: 'gray.50',
      _dark: 'gray.750'
    }
  }
};

export default smtToastComponent;
