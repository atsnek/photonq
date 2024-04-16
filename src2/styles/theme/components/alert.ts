/**
 * The "callout" component is called "alert" in chakra-ui.
 */
const border = '1px solid'; // This only works with the variants below

const themeAlertComponent = {
  variants: {
    default: {
      container: {
        border,
        bgColor: 'components.callout.default.container.bgColor',
        borderColor: 'components.callout.default.container.borderColor',
        color: 'components.callout.default.container.color'
      }
    },
    info: {
      container: {
        border,
        bgColor: 'components.callout.info.container.bgColor',
        borderColor: 'components.callout.info.container.borderColor',
        color: 'components.callout.info.container.color'
      }
    },
    warning: {
      container: {
        border,
        bgColor: 'components.callout.warning.container.bgColor',
        borderColor: 'components.callout.warning.container.borderColor',
        color: 'components.callout.warning.container.color'
      }
    },
    error: {
      container: {
        border,
        bgColor: 'components.callout.error.container.bgColor',
        borderColor: 'components.callout.error.container.borderColor',
        color: 'components.callout.error.container.color'
      }
    }
  }
};

export default themeAlertComponent;
