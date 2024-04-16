const smtPqTopNav = {
  light: {
    backgroundColor: {
      default: 'rgba(13, 14, 17, 0.7)'
    },
    hamburger: {
      backgroundColor: {
        default: 'black'
      }
    }
  },
  dark: {
    backgroundColor: {
      default: 'rgba(255, 255, 255, 0.7)'
    },
    mobileMenuButton: {
      backgroundColor: {
        default: 'rgba(22, 23, 29, 0.3)'
      }
    },
    hamburger: {
      backgroundColor: {
        default: 'white'
      }
    },
    search: {
      input: {
        parent: {
          borderColor: {
            default: 'rgba(255, 255, 255, 0.3)'
          },
          placeholder: {
            color: {
              default: 'rgba(255, 255, 255, 0.3)'
            }
          }
        },
        kbd: {
          borderColor: {
            default: 'rgba(255, 255, 255, 0.3)'
          },
          color: {
            default: 'rgba(255, 255, 255, 0.3)'
          }
        },
        _hover: {
          parent: {
            borderColor: {
              default: 'rgba(255, 255, 255, 1)'
            },
            backgroundColor: {
              default: 'transparent'
            }
          },
          kbd: {
            borderColor: {
              default: 'rgba(255, 255, 255, 1)'
            },
            color: {
              default: 'rgba(255, 255, 255, 1)'
            }
          }
        },
        _focus: {
          parent: {
            borderColor: {
              default: 'pq.500'
            },
            backgroundColor: {
              default: 'transparent'
            },
            placeholder: {
              color: {
                default: 'rgba(255, 255, 255, 0.5)'
              }
            }
          }
        }
      }
    }
  },
  color: {
    default: 'white'
  }
};

export default smtPqTopNav;
