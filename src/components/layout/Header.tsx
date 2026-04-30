import { User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/tasks': return 'Task Management';
      case '/settings': return 'Settings';
      default: return 'my-new-app';
    }
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-secondary text-white border-b border-gray-800 z-10">
      <div className="flex items-center justify-between h-full px-8">
        <h2 className="font-serif text-xl">{getPageTitle()}</h2>
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-primary">
          <User size={20} />
        </button>
      </div>
    </header>
  );
}
