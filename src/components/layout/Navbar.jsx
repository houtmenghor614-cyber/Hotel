import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useSiteSettings } from '../../hooks/useSiteSettings.js';
import MobileMenu from './MobileMenu.jsx';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const site = useSiteSettings();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const logo = site.logo || '/assets/logo/logo.png';
  const siteName = site.site_name || 'HotelBooking';

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt={`${siteName} logo`}
            className="h-9 w-9 rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = '/assets/logo/logo.png';
            }}
          />
          <span className="text-lg font-bold text-brand-700">{siteName}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-slate-600 hover:text-brand-700 hover:bg-slate-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 hover:bg-slate-100"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.full_name}
                    className="h-8 w-8 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Icon name="user" className="w-4 h-4" />
                  </span>
                )}
                <span className="text-sm font-medium text-slate-700">
                  {user.full_name.split(' ')[0]}
                </span>
                <Icon name="chevron-down" className="w-4 h-4 text-slate-400" />
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                  <Link
                    to="/account/profile"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Icon name="user" className="w-4 h-4" /> My Profile
                  </Link>
                  <Link
                    to="/account/bookings"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Icon name="book" className="w-4 h-4" /> My Bookings
                  </Link>
                  <Link
                    to="/account/favorites"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Icon name="heart" className="w-4 h-4" /> Favorites
                  </Link>
                  <Link
                    to="/account/settings"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Icon name="settings" className="w-4 h-4" /> Settings
                  </Link>
                  <hr className="my-2 border-slate-100" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <Icon name="logout" className="w-4 h-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Sign in
              </Button>
              <Button size="sm" onClick={() => navigate('/register')}>
                Register
              </Button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
