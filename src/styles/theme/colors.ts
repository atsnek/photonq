const themeColors = {
  //* Use theme instead of brand (brand is too dark sometimes)
  brand: {
    50: 'rgb(229, 245, 255)',
    100: 'rgb(184, 226, 255)',
    200: 'rgb(138, 208, 255)',
    300: 'rgb(92, 189, 255)',
    400: 'rgb(46, 171, 255)',
    500: '#0063a6',
    600: '#015e9d',
    700: '#005b99',
    800: '#003d66',
    900: '#001e33'
  },
  theme: {
    brand: '#00A9CE',
    100: '#e9f3fc',
    200: '#bfdaf4',
    300: '#67a7e2',
    400: '#509add',
    500: '#348dd7',
    600: '#0580d2',
    700: '#046eb6',
    750: '#035d9b',
    800: '#035d9b',
    900: '#013d68'
  },
  gray: {
    550: '#5F6C81',
    750: '#212836'
  },
  pq: {
    500: '#0580D2'
  },
  red: {
    50: '#FFE7E5',
    100: '#FFBBB8',
    200: '#FF908A',
    300: '#FF655C',
    400: '#FF392E',
    500: '#ff0d00',
    600: '#CC0B00',
    700: '#990800',
    800: '#660600',
    900: '#330300'
  },
  blue: {
    50: '#EBECF9',
    100: '#C8C9EF',
    200: '#A4A6E4',
    300: '#8183DA',
    400: '#5d61d0',
    500: '#3A3EC5',
    600: '#2E319E',
    700: '#232576',
    800: '#17194F',
    900: '#0C0C27'
  },
  yellow: {
    50: '#FFF6E5',
    100: '#FFE7B8',
    200: '#FFD78A',
    300: '#FFC75C',
    400: '#FFB72E',
    500: '#FF8A00',
    600: '#CC8600',
    700: '#996500',
    800: '#664300',
    900: '#332200'
  },
  green: {
    50: '#E7EF3',
    100: '#BBFCDE',
    200: '#8FFAC8',
    300: '#63F8B2',
    400: '#37F69D',
    500: '#0CF387',
    550: '#0BDF7D', // middle between 500 & 600 (used for button hover)
    600: '#09C36C',
    700: '#079251',
    800: '#056136',
    900: '#02311B'
  },
  flat: {
    // https://flatuicolors.com/palette/se
    se: {
      vibrantYellow: '#ffd32a',
      green: {
        50: '#E7EF3',
        100: '#BBFCDE',
        200: '#8FFAC8',
        300: '#63F8B2',
        400: '#37F69D',
        500: '#0CF387',
        550: '#0BDF7D', // middle between 500 & 600 (used for button hover)
        600: '#09C36C',
        700: '#079251',
        800: '#056136',
        900: '#02311B'
      }
    },
    // https://flatuicolors.com/palette/nl
    nl: {
      sunflower: '#FFC312'
    }
  }
};

export default themeColors;
