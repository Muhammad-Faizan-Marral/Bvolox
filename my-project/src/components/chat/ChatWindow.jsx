import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import MessageBubble from "./MessageBubble";
import Spinner from "../common/Spinner";

export const ChatWindow = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a]">
        <div className="text-center text-zinc-500 dark:text-zinc-400">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 opacity-50"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </div>
          <p>No messages yet. Start the conversation!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 bg-zinc-50 dark:bg-[#0a0a0a] chat-scroll">
      <div className="max-w-4xl mx-auto flex flex-col gap-1">
        {messages.map((msg, index) => {
          const prevMsg = index > 0 ? messages[index - 1] : null;
          
          // FIX: Mongoose populated object me user ki key ._id hoti hai, .id nahi
          const currentSenderId = msg.sender?._id || msg.sender;
          const prevSenderId = prevMsg ? (prevMsg.sender?._id || prevMsg.sender) : null;
          const showMargin = prevMsg && prevSenderId !== currentSenderId;

          return (
            <div key={msg._id || index} className={showMargin ? "mt-4" : ""}>
              <MessageBubble message={msg} />
            </div>
          );
        })}
        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  );
};

ChatWindow.propTypes = {
  messages: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default ChatWindow;