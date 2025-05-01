import { useState, useEffect } from "react";
export default function DashboardLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className={`bg-white dark:bg-gray-800 w-64 p-4 fixed top-0 left-0 h-full z-50 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:relative md:translate-x-0`}>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6"> NotesApp</h2>
        <nav className="space-y-4">
          <a href="/dashboard" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">My Notes</a>
          <a href="/login" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Logout</a>
        </nav>
      </aside>

      {/* Overlay for small screens */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content Area */}
      <div className="flex-1 ml-0 md:ml-0 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 shadow-lg">
          <button className="md:hidden text-gray-800 dark:text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>

          <h1 className="text-xl  ml-4 font-semibold text-gray-700 dark:text-white">Dashboard</h1>
  
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded"
          >
            {darkMode ? "🌞" : "🌙 "}
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
