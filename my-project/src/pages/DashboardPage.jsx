import useAuth from "../hooks/useAuth";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-1">
            Salam, {user?.name} 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{user?.email}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => logout(false)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition"
            >
              Logout from this device
            </button>
            <button
              onClick={() => logout(true)}
              className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
            >
              Logout from all devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;