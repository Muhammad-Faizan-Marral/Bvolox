import { useOutletContext } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import ChatWindow from '../components/chat/ChatWindow';
import MessageInput from '../components/chat/MessageInput';
import { useChat } from '../hooks/useChat';

export const GlobalChatPage = () => {
  const { onMenuClick } = useOutletContext();
  const { messages, loading, sendMessage } = useChat('global');

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-[#0a0a0a]">
      <TopBar 
        onMenuClick={onMenuClick} 
        title={
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">🌏</span>
            <span>Global Chat</span>
          </div>
        } 
      />
      
      <ChatWindow messages={messages} loading={loading} /> 
      <MessageInput onSendMessage={sendMessage} />
      
    </div>
  );
};

export default GlobalChatPage;
