import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSearchRoomsQuery, useDeleteRoomMutation } from '@/services/api';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Bed, Plus, Trash } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AdminPage = () => {
  const { data: rooms, error, isLoading } = useSearchRoomsQuery();
  const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [roomToDelete, setRoomToDelete] = useState<any | null>(null);
  
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">You do not have permission to access the admin area.</p>
        <Button onClick={() => navigate('/')}>Go to Homepage</Button>
      </div>
    );
  }
  
  const handleDeleteRoom = async () => {
    if (roomToDelete) {
      try {
        await deleteRoom(roomToDelete.id).unwrap();
        toast({
          title: "Room Deleted",
          description: `Room "${roomToDelete.name}" has been deleted.`,
        });
        setRoomToDelete(null);
      } catch (err) {
        toast({
          title: "Delete Failed",
          description: "Could not delete the room.",
          variant: "destructive",
        });
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link to="/admin/add-room">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Room
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-24" /></TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-red-500">
                  Error loading rooms.
                </TableCell>
              </TableRow>
            ) : rooms && rooms.length > 0 ? (
              rooms.map((room: any) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.name}</TableCell>
                  <TableCell className="capitalize">{room.type}</TableCell>
                  <TableCell>${room.price}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setRoomToDelete(room)}
                      className="flex items-center gap-1"
                      disabled={isDeleting && roomToDelete?.id === room.id}
                    >
                      <Trash className="h-4 w-4" />
                      {isDeleting && roomToDelete?.id === room.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  <div className="flex flex-col items-center">
                    <Bed className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-500">No rooms found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <AlertDialog open={!!roomToDelete} onOpenChange={(isOpen) => !isOpen && setRoomToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the room "{roomToDelete?.name}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRoom} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPage;