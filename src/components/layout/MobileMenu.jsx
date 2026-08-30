import { NavLink, useNavigate } from 'react-router-dom';

import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';
import { useAuth } from '../../hooks/useAuth.js';

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/hotels', label: 'Hotels', icon: 'building' },
  { to: '/rooms', label: 'Rooms', icon: 'bed' },
  { to: '/about', label: 'About', icon: 'helpCircle' },
  { to: '/contact', label: 'Contact', icon: 'mail' },
];

export default function MobileMenu({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  const close = () => onClose();

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-slate-900/50" onClick={close} />
      <div className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-xl fade-in">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <span className="font-semibold text-slate-800">Menu</span>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-3 py-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={close}
              className={({ isActive }) =>
                `mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              <Icon name={link.icon} className="w-5 h-5" />
              {link.label}
            </NavLink>
          ))}

          {user && (
            <>
              <hr className="my-3 border-slate-100" />
              <p className="px-3 pb-1 text-xs uppercase tracking-wider text-slate-400">
                Account
              </p>
              {[
                { to: '/account/profile', label: 'My Profile', icon: 'user' },
                { to: '/account/bookings', label: 'My Bookings', icon: 'book' },
                { to: '/account/favorites', label: 'Favorites', icon: 'heart' },
                { to: '/account/settings', label: 'Settings', icon: 'settings' },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={close}
                  className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Icon name={link.icon} className="w-5 h-5" />
                  {link.label}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-4">
          {user ? (
            <Button
              variant="danger"
              className="w-full"
              onClick={() => {
                logout();
                close();
                navigate('/');
              }}
              iconLeft="logout"
            >
              Sign out
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  close();
                  navigate('/login');
                }}
              >
                Sign in
              </Button>
              <Button
                onClick={() => {
                  close();
                  navigate('/register');
                }}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

