const smtShared = {
  translucent: {
    bgColor: {
      default: 'rgba(255, 255, 255, 0.8)',
      _dark: 'rgba(26, 32, 44, 0.8)'
    }
  },
  text: {
    default: {
      default: 'gray.800',
      _dark: 'gray.400'
    },
    bright: {
      default: 'gray.600',
      _dark: 'gray.300'
    },
    /**
     * Brand-coloured TEXT, and only text: headings, links, the active nav
     * entry. Surfaces, buttons, borders and icons keep `brand.500`, which is
     * the mark and does not move.
     *
     * photonq's problem is the mirror image of netsnek.com's, which added the
     * same token for its orange (11ab293e). photonq's blue passes in light mode
     * and fails in dark. `brand.500` (#0063a6) has a relative luminance of
     * 0.1166, so on the white body it reads (1.05) / (0.1666) = 6.30:1. On the
     * gray.800 body (#1A202C, luminance 0.0143) it reads (0.1666) / (0.0643) =
     * 2.59:1, and the old dark halves were `brand.600`, darker still: 2.4:1 for
     * every section title, card title, docs link and the active top-nav link
     * in dark mode, under even the 3:1 large-text threshold.
     *
     * `brand.300` (rgb 92 189 255, luminance 0.459) reads (0.509) / (0.0643) =
     * 7.9:1 on gray.800 and 8.5:1 on gray.900, so one value clears 4.5:1 for
     * the small links and the big headings alike. It is also the dark half
     * the theme already gives the docs table of contents and the search hover.
     *
     * The `_dark` half assumes a dark ground. Text on a surface that is light
     * in both modes needs a colour that does not flip.
     */
    brand: {
      default: 'brand.500',
      _dark: 'brand.300'
    },
    /**
     * Secondary text: descriptions, dates, captions.
     *
     * Those call sites wrote a bare `gray.600`, which was fine on white
     * (7.5:1) and is 2.2:1 on the gray.800 body in dark mode. gray.400 there
     * reads 7.2:1.
     */
    muted: {
      default: 'gray.600',
      _dark: 'gray.400'
    }
  },
  body: {
    bgColor: {
      default: 'white',
      _dark: 'gray.800'
    }
  },
  scrollbar: {
    thumb: {
      bgColor: {
        default: 'gray.300',
        _dark: 'gray.700'
      },
      hover: {
        bgColor: {
          default: 'gray.400',
          _dark: 'gray.600'
        }
      }
    }
  }
};

export default smtShared;
