
import { useAppSelector } from './redux';

export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);

  const isAdmin = auth.isAuthenticated && auth.user.role === 'ADMIN';
  const isGuest = auth.isAuthenticated && auth.user.role === 'GUEST';

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    isAdmin,
    isGuest,
  };
};
