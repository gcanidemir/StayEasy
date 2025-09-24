import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useCreateRoomMutation } from '@/services/api';

const RoomForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState<'PRIVATE' | 'SUITE'>('PRIVATE');
  const [imageUrl, setImageUrl] = useState('');
  const [amenities, setAmenities] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !price || !type) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const amenitiesList = amenities.split(',').map(item => item.trim()).filter(Boolean);
    const images = [imageUrl || "/placeholder.svg"];
    
    const newRoom = {
      name,
      description,
      price: parseFloat(price),
      amenities: amenitiesList,
      images,
      type,
      isBooked: false,
    };
    
    try {
      await createRoom(newRoom).unwrap();
      toast({
        title: "Room Added",
        description: "The room has been added successfully",
      });
      navigate('/admin');
    } catch (err) {
      toast({
        title: "Creation Failed",
        description: "Could not create the room.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Room Name*</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Room Type</Label>
          <Select value={type} onValueChange={(val: 'PRIVATE' | 'SUITE') => setType(val)} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PRIVATE">Private Room</SelectItem>
              <SelectItem value="SUITE">Suite</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Price per Night ($)*</Label>
          <Input
            id="price"
            type="number"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            disabled={isLoading}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="amenities">Amenities (comma separated)</Label>
        <Input
          id="amenities"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
          placeholder="Wi-Fi, TV, Private Bathroom"
          disabled={isLoading}
        />
      </div>
      
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => navigate('/admin')} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding Room...' : 'Add Room'}
        </Button>
      </div>
    </form>
  );
};

export default RoomForm;