import { Outlet } from 'react-router-dom';

import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import ScrollToTop from '../components/layout/ScrollToTop.jsx';
import AccountSidebar from '../components/account/AccountSidebar.jsx';
import ProtectedRoute from '../components/common/ProtectedRoute.jsx';

export default function AccountLayout() {
  return (
    <ProtectedRoute>
      <ScrollToTop />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <AccountSidebar />
          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
}
