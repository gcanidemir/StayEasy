import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import RoomCard from '@/components/rooms/RoomCard';
import { useGetRoomsQuery } from '@/services/api';
import { ArrowRight, Bed, Clock, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
  const { data, error, isLoading } = useGetRoomsQuery({ page: 0, size: 3 });

  const featuredRooms = data?.content || [];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hostel-800 to-hostel-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find your perfect stay with StayEasy</h1>
            <p className="text-lg md:text-xl mb-8">Comfortable accommodations for every traveler. Book your next adventure with us.</p>
            <Link to="/rooms">
              <Button size="lg" className="bg-white text-hostel-800 hover:bg-gray-100">
                Browse Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose StayEasy?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-hostel-100 p-3 rounded-full mb-4">
                <Bed className="h-6 w-6 text-hostel-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comfortable Stays</h3>
              <p className="text-gray-600">Our rooms are designed for maximum comfort, ensuring you get a good night's rest.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-hostel-100 p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-hostel-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
              <p className="text-gray-600">Centrally located accommodations that make exploring the city convenient.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-hostel-100 p-3 rounded-full mb-4">
                <Clock className="h-6 w-6 text-hostel-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple and quick booking process to secure your stay in minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Rooms</h2>
            <Link to="/rooms" className="flex items-center text-hostel-500 hover:text-hostel-600">
              <span className="mr-2">View all rooms</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading ? (
                [...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)
            ) : error ? (
                <div>Error loading rooms.</div>
            ) : (
                featuredRooms.map((room: any) => (
                    <RoomCard key={room.id} room={room} />
                ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;