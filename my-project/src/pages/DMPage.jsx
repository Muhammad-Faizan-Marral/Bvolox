import { useState, useEffect } from "react";
import { useOutletContext, useParams, Navigate } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import ChatWindow from "../components/chat/ChatWindow";
import MessageInput from "../components/chat/MessageInput";
import UserAvatar from "../components/chat/UserAvatar";
import { useDMs } from "../hooks/useDMs";
import useAuth from "../hooks/useAuth";
import { useSocket } from "../hooks/useSocket";

export const DMPage = () => {
  const { user } = useAuth();
  const { targetUserId } = useParams();
  const { onMenuClick } = useOutletContext();
  const { socket } = useSocket();
  
  const [typingStatus, setTypingStatus] = useState(""); 
  const { messages, loading, sendDM, chatUser } = useDMs(targetUserId, user?._id);

  // Typing listeners status management
  useEffect(() => {
    setTypingStatus(""); // Target user change hotay hi status clear karein
    if (!socket || !targetUserId) return;

    const handleTyping = (data) => {
      if (data.senderId === targetUserId) {
        setTypingStatus("typing...");
      }
    };

    const handleStopTyping = (data) => {
      if (data.senderId === targetUserId) {
        setTypingStatus("");
      }
    };

    socket.on("user-typing", handleTyping);
    socket.on("user-stop-typing", handleStopTyping);

    return () => {
      socket.off("user-typing", handleTyping);
      socket.off("user-stop-typing", handleStopTyping);
    };
  }, [socket, targetUserId]);

  if (!targetUserId) {
    return <Navigate to="/chat/global" replace />;
  }

  if (loading) {
    return (
      <div className="flex-1 bg-zinc-50 dark:bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-zinc-500 dark:text-zinc-400 font-medium animate-pulse">
          Loading premium chat session...
        </p>
      </div>
    );
  }

  const displayUser = chatUser || {
    name: "Volox User",
    avatar: "",
    online: false,
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-[#0a0a0a]">
      <TopBar
        receivedData={typingStatus}
        variant="dm"
        bio={displayUser.bio || ""}
        onMenuClick={onMenuClick}
        title={
          <div className="flex items-center gap-3">
            <UserAvatar
              name={displayUser.name}
              avatarUrl={displayUser.avatar}
              size="sm"
              online={displayUser.online}
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                {displayUser.name}
              </span>
              <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
                {displayUser.online ? "Active now" : "Offline"}
              </span>
            </div>
          </div>
        }
      />

      {/* Messages array ko wrap karke safely check karein */}
      <ChatWindow messages={messages || []} loading={loading} />

      <MessageInput 
        onSendMessage={sendDM} 
        targetUserId={targetUserId} 
      />
    </div>
  );
};

export default DMPage;