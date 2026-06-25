import PropTypes from "prop-types";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";

export const UserListItem = ({ user, onClick, active }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(user);
      navigate(`/chat/dm/${user.userId}`)
    } else {
      navigate(`/chat/dm/${user.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors  ${
        active
          ? "bg-indigo-50 dark:bg-indigo-500/10"
          : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
      }`}
    >
      <UserAvatar
        name={user.name}
        size="sm"
        avatarUrl={user?.avatar}
        online={user.online}
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-700 dark:text-zinc-200"}`}
        >
          {user.name}
        </p>
        {user.bio && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {user.bio}
          </p>
        )}
      </div>
    </div>
  );
};

UserListItem.propTypes = {
user: PropTypes.shape({
  _id:
    PropTypes.string
      .isRequired,

  name:
    PropTypes.string
      .isRequired,

  online:
    PropTypes.bool,

  bio:
    PropTypes.string,

  avatar:
    PropTypes.string,
})
};

export default UserListItem;
