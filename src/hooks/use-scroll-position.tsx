import { useEffect, useState } from 'react';

const useScrollPosition = (): number => {
  if (typeof window === 'undefined') {
    return 0;
  }

  const [scrollPosition, setScrollPosition] = useState<number>(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return scrollPosition;
};

export default useScrollPosition;
