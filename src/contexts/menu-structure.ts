import { createContext, useContext } from 'react';
import { TMenuStructure } from '../utils/navigation/types';

export type TMenuStructureContext = {
  menuStructure: TMenuStructure;
};

/**
 * The menu context representing the menu structure.
 */
export const MenuStructureContext = createContext<TMenuStructureContext>({
  menuStructure: { menu: [], activeIdx: [] }
});

export const useMenuStructureContext = () => {
  const context = useContext(MenuStructureContext);

  if (context === undefined) {
    throw new Error(
      'useMenuStructureContext must be used within a MenuStructureContext.Provider'
    );
  }

  return context;
};
