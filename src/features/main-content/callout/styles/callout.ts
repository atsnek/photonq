const smtCalloutComponent = {
  default: {
    container: {
      bgColor: {
        default: 'rgb(255, 247, 237)',
        _dark: 'rgba(251, 146, 60, 0.2)'
      },
      borderColor: {
        default: 'rgb(255, 237, 213)',
        _dark: 'rgba(251, 146, 60, 0.3)'
      },
      color: {
        default: 'rgb(154, 52, 18)',
        _dark: 'rgb(253, 186, 116)'
      }
    }
  },
  info: {
    container: {
      bgColor: {
        default: 'rgb(219, 234, 254)',
        _dark: 'rgba(30, 58, 138, 0.3)'
      },
      borderColor: {
        default: 'rgb(191, 219, 254)',
        _dark: 'rgb(191, 219, 254, 0.3)'
      },
      color: {
        default: 'rgb(30, 58, 138)',
        _dark: 'rgb(191, 219, 254)'
      }
    }
  },
  warning: {
    container: {
      bgColor: {
        default: 'rgb(254, 252, 232)',
        _dark: 'rgb(161, 98, 7, 0.3)'
      },
      borderColor: {
        default: 'rgb(254, 249, 195)',
        _dark: 'rgb(254, 240, 138, 0.3)'
      },
      color: {
        default: 'rgb(154, 52, 18)',
        _dark: 'rgb(254, 240, 138)'
      }
    }
  },
  error: {
    container: {
      bgColor: {
        default: 'rgb(254, 226, 226)',
        _dark: 'rgba(127, 29, 29, 0.3)'
      },
      borderColor: {
        default: 'rgb(254, 202, 202)',
        _dark: 'rgb(254, 200, 200, 0.3)'
      },
      color: {
        default: 'rgb(127, 29, 29)',
        _dark: 'rgb(254, 202, 202)'
      }
    }
  }
};

export default smtCalloutComponent;
