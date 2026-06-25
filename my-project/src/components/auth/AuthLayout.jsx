const AuthLayout = ({ title, subtitle, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 px-4">
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11s1.343 3 3 3 3-1.343 3-3zm6 8v-1a6 6 0 00-12 0v1"/>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;