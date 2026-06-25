const Spinner = ({ fullScreen }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="h-5 w-5 border-[3px] border-indigo-500 border-t-transparent rounded-full animate-spin" />
  );
};

export default Spinner;
