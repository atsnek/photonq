import { useMemo } from 'react';
import { useAuthenticationContext } from '@atsnek/jaen';

export function useNavOffset(fallback: string = '63px') {
  const auth = useAuthenticationContext();

  const navTopOffset = useMemo(() => {
    return auth.isAuthenticated ? '3.5rem' : fallback;
  }, [auth.isAuthenticated]);
  return navTopOffset;
}
