'use client';

import Sidebar from './Sidebar';
import { useAuth } from '../lib/AuthContext';
import { usePathname } from 'next/navigation';

// Pages that should NOT show the sidebar (public pages)
const publicPages = ['/', '/login', '/signup', '/role-selection'];

export default function AppLayout({ children }) {
  const { user } = useAuth();
  const pathname = usePathname();

  // Don't show sidebar on public pages or when not logged in
  const showSidebar = user && !publicPages.includes(pathname);

  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      <Sidebar />
      <main className="flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
