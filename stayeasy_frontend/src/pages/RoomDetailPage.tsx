import { useParams, useNavigate } from 'react-router-dom';
import { useGetRoomByIdQuery } from '@/services/api';
import RoomDetail from '@/components/rooms/RoomDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const RoomDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: room, error, isLoading } = useGetRoomByIdQuery(id!);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-40 mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Room not found</h1>
        <Button onClick={() => navigate('/rooms')} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to rooms
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => navigate('/rooms')} variant="outline" className="mb-6 flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to rooms
      </Button>
      
      <RoomDetail room={room} />
    </div>
  );
};

export default RoomDetailPage;