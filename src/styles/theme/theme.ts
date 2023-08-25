import {
  extendTheme,
  StyleFunctionProps,
  type ThemeConfig
} from '@chakra-ui/react';
import themeComponents from './components';
import themeColors from './colors';
import themeSemanticTokens from './semanticTokens/semanticTokens';
import themeFonts from './fonts';

const theme: ThemeConfig = extendTheme({
  initialColorMode: 'system',
  useSystemColorMode: true, //? This doesnt sync with the system color mode
  /**
   * SEMANTIC TOKENS
   */
  semanticTokens: themeSemanticTokens,
  /**
   * CUSTOM COLORS
   */
  colors: themeColors,
  /**
   * CUSTOM FONTS
   */
  fonts: themeFonts,
  /**
   * COMPONENT CUSTOMIZATIONS
   */
  components: themeComponents
});

export default theme;
