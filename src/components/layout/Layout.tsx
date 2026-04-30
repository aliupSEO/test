import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-brand-light flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="flex-1 mt-16 p-8 overflow-y-auto text-brand-dark">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
