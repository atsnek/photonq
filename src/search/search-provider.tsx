import { withRedux } from '@atsnek/jaen';

export interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider = withRedux(({ children }: SearchProviderProps) => {
  return <>{children}</>;
});
