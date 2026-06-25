import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useSocket } from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";
// REUSE EXISTING UTIL: Aapka helper module import kiya
import { uploadToCloudinary } from "../../lib/cloudinary"; 

export const MessageInput = ({ onSendMessage, targetUserId }) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const { socket } = useSocket();
  const { user } = useAuth();

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [message]);

  useEffect(() => {
    if (!socket || !user?._id || !targetUserId) return;

    if (message.trim() !== "") {
      socket.emit("start-typing", { senderId: user._id, receiverId: targetUserId });
    } else {
      socket.emit("stop-typing", { senderId: user._id, receiverId: targetUserId });
    }
  }, [message, socket, user?._id, targetUserId]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    // Create a local blob preview url for instant feedback
    setFilePreview(URL.createObjectURL(file));
  };

  const handleSend = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage && !selectedFile) return;

    try {
      setUploading(true);
      let uploadedFileData = null;

      // REUSED COMPONENT LOGIC: Agar file present ho, to helper use karein
      if (selectedFile) {
        const fileType = selectedFile.type.startsWith("video/") ? "video" : "image";
        
        // Directly calling your custom library function
        const secureUrl = await uploadToCloudinary(selectedFile);
        
        if (secureUrl) {
          uploadedFileData = {
            url: secureUrl,
            type: fileType,
          };
        } else {
          throw new Error("Cloudinary returned empty response string.");
        }
      }

      // Dispatch payload to socket stream via handler
      onSendMessage(trimmedMessage, uploadedFileData);
      
      // Cleanup States after successful dispatch
      setMessage("");
      setSelectedFile(null);
      setFilePreview(null);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (err) {
      console.error("Messaging module file processing crashed:", err);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4">
      <div className="max-w-4xl mx-auto flex flex-col bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/50">
        
        {/* File Preview Display Area */}
        {filePreview && (
          <div className="p-3 bg-zinc-200/50 dark:bg-zinc-700/50 flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-700">
            <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-600 bg-black/5">
              {selectedFile?.type.startsWith("video/") ? (
                <video src={filePreview} className="h-full w-full object-cover" muted />
              ) : (
                <img src={filePreview} alt="upload preview" className="h-full w-full object-cover" />
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[10px] text-white font-bold">
                  Uploading...
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">{selectedFile.name}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={() => { setSelectedFile(null); setFilePreview(null); }}
              disabled={uploading}
              className="p-1 rounded-full bg-zinc-300 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-200 hover:bg-red-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex items-end relative focus-within:border-indigo-500/50 transition-colors">
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
          >
            📎
          </button>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*,video/*" 
            className="hidden" 
          />

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={selectedFile ? "Add a caption/message..." : "Type a message..."}
            className="w-full max-h-[120px] bg-transparent resize-none outline-none py-3 px-4 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 chat-scroll"
            rows={1}
            disabled={uploading}
          />
          
          <div className="flex-shrink-0 p-2">
            <button
              onClick={handleSend}
              disabled={uploading || (!message.trim() && !selectedFile)}
              className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors flex items-center justify-center group"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -mt-0.5 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  targetUserId: PropTypes.string.isRequired,
};

export default MessageInput;