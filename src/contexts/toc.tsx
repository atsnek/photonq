import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';
import { createContext, useContext, useState } from 'react';

export type TOCContext = {
  value: MdastRoot | undefined;
  setValue: (data: MdastRoot | undefined) => void;
};

/**
 * The menu context representing the menu structure.
 */
export const TOCContext = createContext<TOCContext>({
  value: undefined,
  setValue: () => {}
});

export const useTOCContext = () => {
  const context = useContext(TOCContext);

  if (context === undefined) {
    throw new Error('useTOCContext must be used within a TOCContext.Provider');
  }

  return context;
};

export const TOCProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [value, setValue] = useState<MdastRoot | undefined>();

  return (
    <TOCContext.Provider value={{ value, setValue }}>
      {children}
    </TOCContext.Provider>
  );
};
