
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useBookRoomMutation, useCancelBookingMutation } from '@/services/api';

interface RoomDetailProps {
  room: any;
}

const RoomDetail = ({ room }: RoomDetailProps) => {
  const { isAuthenticated, isGuest, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookRoom, { isLoading: isBooking }] = useBookRoomMutation();
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast({ title: "Authentication required", description: "Please login to book a room", variant: "destructive" });
      navigate('/login');
      return;
    }
    if (!isGuest) {
      toast({ title: "Permission denied", description: "Only guests can book rooms", variant: "destructive" });
      return;
    }
    try {
      await bookRoom({ userId: user.userId, roomId: room.id }).unwrap();
      toast({ title: "Booking confirmed", description: `Your stay at ${room.name} has been booked.` });
      navigate('/rooms');
    } catch (err) {
      toast({ title: "Booking Failed", description: "Could not book the room. It might already be booked or an error occurred.", variant: "destructive" });
    }
  };

  const handleCancelBooking = async () => {
    try {
      await cancelBooking({ userId: user.userId, roomId: room.id }).unwrap();
      toast({ title: "Booking Cancelled", description: `Your booking for ${room.name} has been cancelled.` });
      navigate('/rooms');
    } catch (err) {
      toast({ title: "Cancellation Failed", description: "Could not cancel the booking.", variant: "destructive" });
    }
  };

  const renderBookingButton = () => {
    if (room.isBooked) {
      if (isAuthenticated && user.userId === room.bookedByUserId) {
        return (
          <Button className="w-full" onClick={handleCancelBooking} disabled={isCancelling} variant="destructive">
            {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
          </Button>
        );
      }
      return <Button className="w-full" disabled>Booked</Button>;
    }
    return (
      <Button className="w-full" onClick={handleBooking} disabled={isBooking}>
        {isBooking ? 'Booking...' : 'Book now'}
      </Button>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-t-lg">
        <img src={room.images?.[0] || '/placeholder.svg'} alt={room.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="md:w-2/3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{room.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm">
                <span className="font-semibold">Type:</span>
                <span className="capitalize">{room.type}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{room.description}</p>
            </div>
            <Separator className="my-4" />
            <div>
              <h2 className="text-lg font-semibold mb-2">Amenities</h2>
              <ul className="grid grid-cols-2 gap-2">
                {room.amenities.map((amenity: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-hostel-500" />
                    <span className="text-sm">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-hostel-500 mb-2">${room.price} <span className="text-sm font-normal text-gray-500">per night</span></div>
            <div className="space-y-3">
              {renderBookingButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
