import { Outlet } from 'react-router-dom';

import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import ScrollToTop from '../components/layout/ScrollToTop.jsx';

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
