import { useMemo } from 'react';
import { useAuth } from 'jaen';

function useNavOffset(fallback: string = '85px') {
  const auth = useAuth();

  const navTopOffset = useMemo(() => {
    return auth.isAuthenticated ? '25px' : fallback;
  }, [auth.isAuthenticated]);
  return navTopOffset;
}

export default useNavOffset;
