import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useRooms } from '../hooks/useRooms';
import RoomForm from '../components/RoomForm';
import { Room } from '../types';

export default function Rooms() {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const {
    rooms,
    isLoading,
    createRoom,
    updateRoom,
    deleteRoom
  } = useRooms();

  const handleAddRoom = (data: Omit<Room, 'id'>) => {
    createRoom.mutate(data, {
      onSuccess: () => setIsAddRoomOpen(false),
    });
  };

  const handleEditRoom = (data: Omit<Room, 'id'>) => {
    if (editingRoom) {
      updateRoom.mutate(
        { ...data, id: editingRoom.id },
        {
          onSuccess: () => setEditingRoom(null),
        }
      );
    }
  };

  const handleDeleteRoom = (id: number) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      deleteRoom.mutate(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Rooms</h1>
        <button
          onClick={() => setIsAddRoomOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 text-center py-8">Loading...</div>
        ) : (
          rooms?.map((room) => (
            <div key={room.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Room {room.number}</h3>
                  <p className="text-sm text-gray-500">{room.type}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingRoom(room)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room.id)}
                    className="p-1 hover:bg-gray-100 rounded text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Floor</span>
                  <span>{room.floor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      room.status === 'Vacant'
                        ? 'bg-green-100 text-green-800'
                        : room.status === 'Occupied'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price</span>
                  <span>${room.price}/month</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Facilities</span>
                  <div className="flex flex-wrap gap-2">
                    {room.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {(isAddRoomOpen || editingRoom) && (
        <RoomForm
          onSubmit={editingRoom ? handleEditRoom : handleAddRoom}
          onClose={() => {
            setIsAddRoomOpen(false);
            setEditingRoom(null);
          }}
          initialData={editingRoom || undefined}
        />
      )}
    </div>
  );
}