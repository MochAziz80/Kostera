import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import { Room } from '../types';
import { toast } from 'react-hot-toast';

export const useRooms = () => {
  const queryClient = useQueryClient();

  const { data: rooms, isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data } = await api.get<Room[]>('/rooms');
      return data;
    },
  });

  const createRoom = useMutation({
    mutationFn: async (newRoom: Omit<Room, 'id'>) => {
      const { data } = await api.post<Room>('/rooms', newRoom);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast.success('Room added successfully');
    },
    onError: () => {
      toast.error('Failed to add room');
    },
  });

  const updateRoom = useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Room> & { id: number }) => {
      const { data } = await api.put<Room>(`/rooms/${id}`, updateData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast.success('Room updated successfully');
    },
    onError: () => {
      toast.error('Failed to update room');
    },
  });

  const deleteRoom = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/rooms/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast.success('Room deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete room');
    },
  });

  return {
    rooms,
    isLoading,
    createRoom,
    updateRoom,
    deleteRoom,
  };
};