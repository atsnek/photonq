import { ChakraProvider } from '@chakra-ui/react';

import SearchMenu from '../../components/search-menu';
import { chromeSystem } from '../../styles/theme/system';

export interface ToolbarProps {}

/**
 * The only mount of SearchMenu that renders inside jaen's frame.
 *
 * On a site route Layout already provides the site system, and SearchMenu
 * simply inherits it. On a CMS route Layout takes the other branch and mounts
 * nothing, so the search box would compile against jaen's system and pick up
 * jaen's tokens instead of the site's. `chromeSystem` is the site's tokens
 * without its html and body rules, which is what v2's bare ThemeProvider did
 * here and the only thing this position needs.
 *
 * It belongs here rather than inside SearchMenu because SearchMenu renders in
 * four places and a v3 provider emits the whole token block every time it
 * mounts. Keeping it at the single position that actually needs it took two
 * duplicate 66.4 KB blocks off every public page.
 */
export const Toolbar: React.FC<ToolbarProps> = () => {
  return (
    <ChakraProvider value={chromeSystem}>
      <SearchMenu />
    </ChakraProvider>
  );
};
