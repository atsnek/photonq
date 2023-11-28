const smtSinglePostPage = {
  topNav: {
    bgColor: {
      default: 'gray.50',
      _dark: 'gray.700'
    },
    borderColor: {
      default: 'gray.200',
      _dark: 'gray.600'
    },
    rating: {
      bgColor: {
        default: 'gray.200',
        _dark: 'gray.600'
      },
      _hover: {
        bgColor: {
          default: 'gray.300',
          _dark: 'gray.550'
        }
      }
    }
  },
  leftNav: {
    summary: {
      color: {
        default: 'gray.600',
        _dark: 'gray.400'
      }
    },
    tags: {
      privacy: {
        public: {
          hover: {
            bgColor: {
              default: 'green.200',
              _dark: 'green.700'
            },
            color: {
              default: 'green.800',
              _dark: 'green.100'
            }
          }
        },
        private: {
          hover: {
            bgColor: {
              default: 'yellow.200',
              _dark: 'yellow.600'
            }
          }
        }
      },
      language: {
        hover: {
          bgColor: {
            default: 'gray.200',
            _dark: 'gray.600'
          }
        }
      }
    }
  }
};

export default smtSinglePostPage;
