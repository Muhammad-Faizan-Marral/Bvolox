import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import UserAvatar from "../chat/UserAvatar";
import UserListItem from "../chat/UserListItem";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSocket } from "../../hooks/useSocket"; 
import { useState } from "react";

export const Sidebar = ({ isOpen, onClose }) => {
  const { socket, isConnected } = useSocket();

  const { user, logout } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);
   console.log("onlineUsers:", onlineUsers)
  useEffect(() => {
    if (!user) return;

    socket.emit("user_connected",user);
    socket.on("update_user_list", (users) => {
      const filteredUsers = users.filter((u) => u.userId !== user._id);
      setOnlineUsers(filteredUsers);
    });
    return () => {
      socket.off("update_user_list");
    };
  }, [user]);


  const navLinks = [
    {
      name: "Global Chat",
      path: "/chat/global",
      icon: "M8.625 15.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0-3a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0-3a.375.375 0 11-.75 0 .375.375 0 01.75 0zM15 15.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0-3a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0-3a.375.375 0 11-.75 0 .375.375 0 01.75 0zM2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.595-5.219-3.918-6.815-6.815l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
    },
    {
      name: "Rooms",
      path: "/chat/rooms",
      icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-[260px] bg-white dark:bg-[#0a0a0a] border-r border-zinc-200 dark:border-zinc-800 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0 ">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Volox
            </span>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="ml-auto md:hidden p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6 scrollbar-hide ">
          <nav className="flex flex-col gap-1">
            <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Navigation
            </div>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 opacity-80"
                >
                  {/* Using generic icon for now, can be swapped based on name */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Online Users */}
          <div className="flex flex-col gap-1">
            <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider flex justify-between items-center">
              <span>Online Users</span>
              <span className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 py-0.5 px-2 rounded-full text-[10px]">
                {onlineUsers.length}
              </span>
            </div>
            {onlineUsers.map((u,i) => (
              <UserListItem
                key={i}
                user={u}
                onClick={() => {
                  if (window.innerWidth < 768) onClose();
                }}
              />
            ))}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 ">
          <div className="flex items-center gap-3 mb-4">
            <UserAvatar
              name={user?.name || "User"}
              avatarUrl={user?.avatar}
              size="md"
              online={true}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                {user?.name || "Loading..."}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {user?.email || ""}
              </p>
            </div>
            <NavLink
              to="/profile"
              onClick={() => window.innerWidth < 768 && onClose()}
              className="p-2 text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.78.929l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </NavLink>
          </div>
          <button
            onClick={() => logout(false)}
            className="w-full py-2 px-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
