import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Settings } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-brand-dark text-white flex flex-col">
      {/* TOP AREA */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="font-serif text-2xl text-brand-primary tracking-wide">Global Template</h1>
      </div>

      {/* MIDDLE AREA */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-gray-800 text-brand-primary' : 'text-gray-400 hover:text-brand-primary hover:bg-gray-800/50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM AREA */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-2 px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">System Online</span>
        </div>
      </div>
    </aside>
  );
}
