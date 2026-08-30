import { NavLink } from 'react-router-dom';

import Icon from '../common/Icon.jsx';
import { useAuth } from '../../hooks/useAuth.js';

const LINKS = [
  { to: '/account/profile', label: 'My Profile', icon: 'user' },
  { to: '/account/bookings', label: 'My Bookings', icon: 'book' },
  { to: '/account/favorites', label: 'Favorites', icon: 'heart' },
  { to: '/account/reviews', label: 'My Reviews', icon: 'quote' },
  { to: '/account/settings', label: 'Settings', icon: 'settings' },
];

export default function AccountSidebar() {
  const { user } = useAuth();

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.full_name}
            className="h-11 w-11 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white">
            <Icon name="user" className="w-5 h-5" />
          </span>
        )}
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-800">{user?.full_name}</div>
          <div className="truncate text-xs text-slate-500">@{user?.username}</div>
        </div>
      </div>

      <nav className="mt-3 space-y-1">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            <Icon name={link.icon} className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
