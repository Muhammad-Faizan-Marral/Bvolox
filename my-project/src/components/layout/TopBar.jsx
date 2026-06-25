import PropTypes from 'prop-types';

export const TopBar = ({ 
  receivedData, // 👈 Parent se data mil raha hai ("typing..." ya "")
  onMenuClick, 
  title, 
  rightElement,
  bio,
  variant = "default"
}) => {
  return (
    <div className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
      
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Menu Button for Mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
        </button>

        {/* Title Section with Smart Status/Typing logic */}
        {variant === "dm" ? (
          <div className="flex items-center gap-3">
            {/* Title me Avatar aur Naam aa raha hai parent se */}
            {title}
            
            {/* 🌟 Beautiful Typing Indicator Overlay */}
            {receivedData === "typing..." && (
              <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/50 ml-1 animate-pulse">
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  typing
                </span>
                <div className="flex gap-0.5 items-center pt-1">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
            {title}
          </h1>
        )}
      </div>
      
      {/* Right Side - Bio */}
      <div className="flex items-center gap-4">
        {variant === "dm" && bio && (
          <h1 className="hidden sm:block text-sm text-zinc-500 dark:text-zinc-400 font-normal truncate max-w-[320px] lg:max-w-[480px]">
            {bio}
          </h1>
        )}

        {rightElement && (
          <div className="flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

TopBar.propTypes = {
  receivedData: PropTypes.string,
  onMenuClick: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  rightElement: PropTypes.node,
  bio: PropTypes.string,
  variant: PropTypes.oneOf(["default", "dm"]),
};

export default TopBar;