const Button = ({ children, loading, variant = "primary", ...props }) => {
  const base = "w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white",
    danger:  "bg-red-500 hover:bg-red-600 text-white",
    outline: "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
  };

  return (
    <button className={`${base} ${variants[variant]}`} disabled={loading || props.disabled} {...props}>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;