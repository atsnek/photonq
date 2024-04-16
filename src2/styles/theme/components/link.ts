const themeLinkComponent = {
  variants: {
    'hover-opacity': {
      opacity: 0.7,
      _hover: {
        opacity: 1
      },
      transition: 'opacity 0.1s ease-in-out'
    },
    'hover-theme': {
      _hover: {
        color: 'components.link._hover.color'
      },
      transition: 'color 0.1s ease-in-out'
    },
    'right-bottom-nav': {
      display: 'block',
      width: '100%',
      opacity: 0.7,
      _hover: {
        opacity: 1
      },
      transition: 'opacity 0.1s ease-in-out'
    },
    'pq-footer': {
      fontWeight: 500,
      opacity: 0.6,
      _hover: {
        opacity: 1
      },
      transition: 'opacity 0.2s ease-in-out'
    }
  }
};

export default themeLinkComponent;
