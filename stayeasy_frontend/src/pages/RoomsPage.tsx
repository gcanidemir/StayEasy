import { useState, useMemo } from 'react';
import RoomCard from '@/components/rooms/RoomCard';
import { useGetRoomsQuery, useSearchRoomsQuery } from '@/services/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const RoomsPage = () => {
  const [page, setPage] = useState(0);
  const { data: paginatedData, error: paginatedError, isLoading: isPaginatedLoading } = useGetRoomsQuery({ page, size: 6 });
  const { data: allRoomsData, error: searchError, isLoading: isSearchLoading } = useSearchRoomsQuery();

  const [roomType, setRoomType] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const roomsToDisplay = searchTerm ? allRoomsData : paginatedData?.content;

  const maxPriceInRooms = useMemo(() => {
    if (!allRoomsData) return 200;
    return Math.max(...allRoomsData.map((room: any) => room.price));
  }, [allRoomsData]);

  const filteredRooms = useMemo(() => {
    if (!roomsToDisplay) return [];
    return roomsToDisplay.filter((room: any) => {
      if (roomType !== 'all' && room.type !== roomType) {
        return false;
      }
      if (room.price < minPrice || room.price > maxPrice) {
        return false;
      }
      if (searchTerm && !room.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !room.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [roomsToDisplay, roomType, minPrice, maxPrice, searchTerm]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < (paginatedData?.totalPages || 0)) {
      setPage(newPage);
    }
  };

  const isLoading = isPaginatedLoading || isSearchLoading;

  if (paginatedError || searchError) {
    return <div className="container mx-auto px-4 py-8">Error loading rooms.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Rooms</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="search" className="mb-2 block">Search</Label>
              <Input
                id="search"
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="roomType" className="mb-2 block">Room Type</Label>
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="PRIVATE">Private Room</SelectItem>
                  <SelectItem value="SUITE">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="mb-2 block">Price Range</Label>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm">${minPrice}</span>
                <span className="text-sm">${maxPrice}</span>
              </div>
              <DualRangeSlider
                defaultValue={[minPrice, maxPrice]}
                min={0}
                max={Math.max(maxPriceInRooms, 200)}
                step={5}
                onValueChange={([min, max]) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Room listings */}
        <div className="w-full md:w-3/4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
            </div>
          ) : filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room : any) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">No rooms found</h3>
              <p className="text-gray-600">Try adjusting your filters to find available rooms.</p>
            </div>
          )}
          {!searchTerm && paginatedData && paginatedData.totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
                </PaginationItem>
                {[...Array(paginatedData.totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink onClick={() => handlePageChange(i)} isActive={page === i}>
                        {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(page + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;