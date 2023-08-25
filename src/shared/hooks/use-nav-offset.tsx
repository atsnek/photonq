import { useMemo } from 'react';
import { useAuthenticationContext } from '@atsnek/jaen';

export function useNavOffset() {
  const auth = useAuthenticationContext();

  const navTopOffset = useMemo(() => {
    return auth.isAuthenticated ? '3.5rem' : '0rem';
  }, [auth.isAuthenticated]);
  return navTopOffset;
}
