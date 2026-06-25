import PropTypes from "prop-types";
import UserAvatar from "./UserAvatar";
import useAuth from "../../hooks/useAuth"; 

export const MessageBubble = ({ message }) => {
  console.log("chatwindow to ", message);
  const { user } = useAuth(); 
  
  // Destructure including the new media variables
  const { text, sender, createdAt, fileUrl, fileType } = message;

  const isOwn = sender?._id === user?._id || sender === user?._id;

  const formattedTime = createdAt
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(createdAt))
    : "";

  return (
    <div className={`flex w-full mt-4 space-x-3 ${isOwn ? "justify-end" : "justify-start"}`}>
      {!isOwn && sender?.name && (
        <div className="flex-shrink-0 mt-auto mb-1">
          <UserAvatar name={sender.name} avatarUrl={sender.avatar} size="sm" />
        </div>
      )}
      <div className={`flex flex-col max-w-[70%] ${isOwn ? "items-end" : "items-start"}`}>
        {!isOwn && sender?.name && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 ml-1 font-medium">
            {sender.name}
          </span>
        )}
        
        <div
          className={`px-4 py-2.5 rounded-2xl ${
            isOwn
              ? "bg-indigo-600 text-white rounded-br-sm"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-sm border border-zinc-200 dark:border-zinc-700/50"
          }`}
        >
          {/* ---- ATTACHMENT CONDITIONAL RENDER ENGINE ---- */}
          {fileUrl && (
            <div className="mb-2 overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-zinc-950/5 max-w-xs md:max-w-sm">
              {fileType === "image" ? (
                <img 
                  src={fileUrl} 
                  alt="Shared attachment visual content" 
                  className="w-full max-h-64 object-cover cursor-pointer hover:opacity-95 transition-opacity"
                  onClick={() => window.open(fileUrl, "_blank")}
                />
              ) : fileType === "video" ? (
                <video 
                  src={fileUrl} 
                  controls 
                  className="w-full max-h-64 object-cover"
                />
              ) : null}
            </div>
          )}

          {/* ---- REGULAR TEXT MESSAGE LAYER ---- */}
          {text && (
            <p className="whitespace-pre-wrap break-words leading-relaxed">
              {text}
            </p>
          )}
        </div>
        
        <span className={`text-[10px] text-zinc-400 mt-1 ${isOwn ? "mr-1" : "ml-1"}`}>
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

// Updated prop-types configuration scheme mapping
MessageBubble.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string,
    fileUrl: PropTypes.string,
    fileType: PropTypes.string,
    sender: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default MessageBubble;