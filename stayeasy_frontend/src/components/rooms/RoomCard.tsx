
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  amenities: string[];
  images: string[];
  type: 'PRIVATE' | 'SUITE';
  isBooked: boolean;
}

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const { id, name, price, type, images } = room;

  return (
    <Link to={`/rooms/${id}`}>
      <Card className="overflow-hidden room-card">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={images && images.length > 0 ? images[0] : '/placeholder.svg'}
            alt={name}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-2 left-2 flex gap-1">
            <Badge variant="secondary" className="bg-white text-black capitalize">
              {type}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-hostel-500">${price}</div>
              <div className="text-xs text-gray-500">per night</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RoomCard;
