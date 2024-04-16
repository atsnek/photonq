import { useEffect, useState } from 'react';

type TWindowSize = {
  width: number;
  height: number;
};

/**
 * Hook for getting the current window size.
 */
const useWindowSize = (): TWindowSize => {
  // We need this because of Gatsby's SSR
  if (typeof window === 'undefined') {
    return useState<TWindowSize>({ width: 0, height: 0 })[0];
  }

  const [size, setSize] = useState<TWindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return size;
};

export default useWindowSize;
