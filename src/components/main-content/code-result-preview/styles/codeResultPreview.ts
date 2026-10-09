const smtCodeResultPreviewComponent = {
  header: {
    bgColor: {
      default: 'gray.100',
      _dark: '#011a2f'
    },
    text: {
      color: {
        default: 'gray.600',
        _dark: 'gray.400'
      }
    }
  },
  noResult: {
    // "Not run yet" is the only text in an empty result panel, and it was
    // gray.400 on white (2.3:1) and gray.500 on the dark card (4.1:1). This is
    // the muted text pair of shared.text.muted, 7.5:1 and 7.2:1.
    text: {
      color: {
        default: 'gray.600',
        _dark: 'gray.400'
      }
    }
  },
  loadingSpinner: {
    color: {
      default: 'gray.400',
      _dark: 'gray.500'
    }
  },
  borderColor: {
    default: 'gray.200',
    _dark: 'rgba(45, 55, 72, 0.75)'
  }
};

export default smtCodeResultPreviewComponent;
