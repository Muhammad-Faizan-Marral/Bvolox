import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import RoomCard from "../components/chat/RoomCard";
import { useRooms } from "../hooks/useRooms";
import Spinner from "../components/common/Spinner";
import { joinRoom } from "../api/room.api"; 

export const RoomsPage = () => {
  const { onMenuClick } = useOutletContext();
  
  // useRooms hook se rooms aur state methods nikalay
  const { rooms, loading, createNewRoom } = useRooms();
  
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  // Naya room successfully create karne ke liye handler
  const handleCreateRoom = async () => {
    if (!roomName.trim()) return;

    try {
      await createNewRoom({
        name: roomName,
        description: roomDescription,
      });

      // Modal reset aur close karna
      setRoomName("");
      setRoomDescription("");
      setShowModal(false);
    } catch (error) {
      console.error("Room create karne mein error aya:", error);
    }
  };

  // Card par majood Join button click hone par handler
  const handleToggleJoin = async (roomId) => {
    try {
      // Backend api call to join room array
      await joinRoom(roomId);
      console.log("Successfully joined room:", roomId);
      
      // Join hote hi direct us room ki chat screen par le jayen
      navigate(`/chat/rooms/${roomId}`);
    } catch (error) {
      console.error("Room join handler failed:", error);
    }
  };

  // Real-time search filter logic
  const filteredRooms = rooms.filter((room) =>
    room.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-[#0a0a0a]">
      <TopBar onMenuClick={onMenuClick} title="Rooms" />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 chat-scroll">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar & Action Trigger Button */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative max-w-md flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                🔍
              </div>
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl"
              />
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
            >
              + Create Room
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              {filteredRooms.length === 0 ? (
                <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
                  No rooms found matching &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredRooms.map((room) => (
                    <RoomCard
                      key={room._id || room.id}
                      room={room}
                      onToggleJoin={handleToggleJoin}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Dynamic Creation Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-2xl border dark:border-zinc-800">
            <h2 className="text-xl font-bold mb-5 text-zinc-900 dark:text-white">Create Room</h2>

            <input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Room Name"
              className="w-full mb-4 p-3 rounded-xl border bg-transparent dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />

            <textarea
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-3 rounded-xl border bg-transparent dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 min-h-[100px] resize-none"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border text-zinc-700 dark:text-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRoom}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsPage;