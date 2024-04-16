import React, { useEffect, useState } from 'react';

const NoSSR: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <>{children}</> : null;
};

export default NoSSR;
