// This contains the tokens for all PostPreview variants
const smtPostPreviewComponent = {
  // SHARED TOKENS
  date: {
    color: {
      default: 'gray.400',
      _dark: 'gray.500'
    }
  },
  author: {
    color: {
      default: 'gray.400',
      _dark: 'gray.500'
    }
  },
  // CARD PREVIEW
  //...
  // LIST ITEM PREVIEW
  listItem: {
    // Originally wanted to name this default, but seems to be a reserved keyword
    initial: {
      bgColor: {
        default: 'gray.50',
        _dark: 'gray.800'
      },
      borderColor: {
        default: 'gray.100',
        _dark: 'gray.700'
      },
      title: {
        color: 'shared.text.default'
      },
      date: {
        color: {
          default: 'gray.500',
          _dark: 'gray.500'
        }
      },
      summary: {
        color: {
          default: 'gray.600',
          _dark: 'gray.400'
        }
      }
    },
    _hover: {
      borderColor: {
        default: 'theme.500',
        _dark: 'theme.500'
      },
      title: {
        color: {
          default: 'theme.500',
          _dark: 'theme.500'
        }
      }
    }
  }
};

export default smtPostPreviewComponent;
