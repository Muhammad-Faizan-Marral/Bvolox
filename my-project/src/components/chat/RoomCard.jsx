import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; // User authentication context helper ka rasta

export const RoomCard = ({ room, onToggleJoin }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Logged-in user ki id nikalne ke liye
  
  // IDs safe fallback checks
  const id = room._id || room.id;
  const name = room.name || "Unnamed Room";
  const description = room.description || "No description provided.";
  
  // MongoDB schema array check: Agar user members array mein hai ya room banane wala khud hai
  const isJoined = room.joined || room.members?.includes(user?._id) || room.createdBy?._id === user?._id || room.createdBy === user?._id;
  const memberCount = room.memberCount || room.members?.length || 0;

  const handleJoinClick = (e) => {
    e.stopPropagation(); // Card component click ripple se bachane ke liye
    if (!isJoined && onToggleJoin) {
      onToggleJoin(id);
    } else if (isJoined) {
      navigate(`/chat/rooms/${id}`);
    }
  };

  const handleCardClick = () => {
    // Agar user pehle se joined hai to poore card par kahin bhi click karne se chat room open ho
    if (isJoined) {
      navigate(`/chat/rooms/${id}`);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`relative p-5 rounded-xl border bg-white dark:bg-zinc-900 transition-all duration-200 select-none ${
        isJoined 
          ? 'border-indigo-500/50 hover:border-indigo-500 shadow-sm cursor-pointer' 
          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer'
      }`}
    >
      {isJoined && (
        <div className="absolute top-4 right-4 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </div>
      )}
      
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white line-clamp-1">
          # {name}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 min-h-[2.5rem]">
          {description}
        </p>
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <span className="mr-1.5 text-base">👥</span>
          {memberCount} {memberCount === 1 ? 'member' : 'members'}
        </div>
        
        <button
          onClick={handleJoinClick}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            isJoined 
              ? 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isJoined ? 'Open Chat' : 'Join'}
        </button>
      </div>
    </div>
  );
};

RoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    memberCount: PropTypes.number,
    members: PropTypes.array,
    createdBy: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    joined: PropTypes.bool,
  }).isRequired,
  onToggleJoin: PropTypes.func,
};

export default RoomCard;