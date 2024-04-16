import { useAuth } from '@atsnek/jaen';

/**
 * Hook for checking if a user is authenticated.
 * @returns {boolean} Whether the user is authenticated.
 */
const useAuth = (): boolean => {
  const { user } = useAuth();
  return !!user;
};

export default useAuth;
