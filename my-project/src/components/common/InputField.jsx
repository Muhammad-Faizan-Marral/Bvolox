const InputField = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all
          bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
          placeholder:text-gray-400
          ${
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
              : "border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900"
          }`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default InputField;
