
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/redux';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/store/authSlice';
import { Bed, LogOut } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Bed className="h-6 w-6 text-hostel-500" />
            <span className="text-xl font-bold text-hostel-500">StayEasy</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium ${location.pathname === '/' ? 'text-hostel-500' : 'text-gray-600 hover:text-hostel-500'}`}
            >
              Home
            </Link>
            <Link 
              to="/rooms" 
              className={`text-sm font-medium ${location.pathname === '/rooms' ? 'text-hostel-500' : 'text-gray-600 hover:text-hostel-500'}`}
            >
              Rooms
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`text-sm font-medium ${location.pathname === '/admin' ? 'text-hostel-500' : 'text-gray-600 hover:text-hostel-500'}`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <div className="avatar-placeholder h-8 w-8 text-sm">
                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-medium">{user.fullName}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">
        {children}
      </main>

      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Bed className="h-6 w-6 text-hostel-500" />
              <span className="text-lg font-semibold text-hostel-500">StayEasy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
