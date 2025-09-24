
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import RoomForm from '@/components/admin/RoomForm';
import { useAuth } from '@/hooks/useAuth';

const AddRoomPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">You do not have permission to access this page.</p>
        <Button onClick={() => navigate('/')}>Go to Homepage</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => navigate('/admin')} variant="outline" className="mb-6 flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Room</h1>
        <RoomForm />
      </div>
    </div>
  );
};

export default AddRoomPage;
