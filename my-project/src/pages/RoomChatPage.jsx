import { useOutletContext, useParams, Navigate } from "react-router-dom";

import TopBar from "../components/layout/TopBar";
import ChatWindow from "../components/chat/ChatWindow";
import MessageInput from "../components/chat/MessageInput";

import { useRooms } from "../hooks/useRooms";

export const RoomChatPage = () => {
  const { roomId } = useParams();
  const { onMenuClick } = useOutletContext();

  const { rooms, messages, loading, sendMessage } = useRooms(roomId);

  const currentRoom = rooms.find((room) => room._id === roomId);

  if (!loading && !currentRoom) {
    return <Navigate to="/chat/rooms" replace />;
  }

  return (
    <div className="flex h-full w-full bg-zinc-50 dark:bg-[#0a0a0a]">
      {/* Main Chat */}

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          onMenuClick={onMenuClick}
          title={
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">#</span>

              <span>{currentRoom?.name || "Loading..."}</span>
            </div>
          }
        />

        <ChatWindow messages={messages} loading={loading} />

        <MessageInput
          onSendMessage={sendMessage}
          targetUserId=""
          sendDataToParent={() => {}}
        />
      </div>
    </div>
  );
};

export default RoomChatPage;
