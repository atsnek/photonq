import { createContext, useContext } from 'react';
import { TMenuStructure } from '../types/menu';

export type TMenuContext = {
  menuStructure: TMenuStructure;
};

/**
 * The menu context representing the menu structure.
 */
export const MenuContext = createContext<TMenuContext>({
  menuStructure: { menu: [], activeIdx: [] }
});

export const useMenuContext = () => {
  const context = useContext(MenuContext);

  if (context === undefined) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }

  return context;
};
