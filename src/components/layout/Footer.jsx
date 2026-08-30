import { Link } from 'react-router-dom';

import Icon from '../common/Icon.jsx';
import { useSiteSettings } from '../../hooks/useSiteSettings.js';

export default function Footer() {
  const site = useSiteSettings();
  const logo = site.logo || '/assets/logo/logo.png';
  const siteName = site.site_name || 'HotelBooking';
  const email = site.contact_email || 'support@hotelbooking.vn';
  const phone = site.contact_phone || '+84 28 3822 1234';
  const address = site.contact_address || '12 Nguyen Hue, District 1, Ho Chi Minh City, Vietnam';

  return (
    <footer className="mt-auto bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt={`${siteName} logo`}
              className="h-9 w-9 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.src = '/assets/logo/logo.png';
              }}
            />
            <span className="text-lg font-bold text-white">{siteName}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Find the perfect stay for your next trip. Best hotels, best prices,
            easy booking.
          </p>
          <div className="mt-4 flex gap-3">
            {['facebook', 'instagram', 'twitter'].map((network) => (
              <a
                key={network}
                href="#"
                aria-label={network}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-brand-600 hover:text-white transition"
              >
                <Icon name={network} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: '/', label: 'Home' },
              { to: '/hotels', label: 'Hotels' },
              { to: '/rooms', label: 'Rooms' },
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Contact' },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-brand-400 transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Account
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/login" className="hover:text-brand-400 transition">
                Sign in
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-brand-400 transition">
                Create account
              </Link>
            </li>
            <li>
              <Link to="/account/bookings" className="hover:text-brand-400 transition">
                My bookings
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-brand-400 transition">
                Terms of service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-brand-400 transition">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Icon name="map-pin" className="w-4 h-4 mt-0.5 text-brand-400" />
              {address}
            </li>
            <li className="flex items-center gap-2">
              <Icon name="phone" className="w-4 h-4 text-brand-400" />
              {phone}
            </li>
            <li className="flex items-center gap-2">
              <Icon name="mail" className="w-4 h-4 text-brand-400" />
              {email}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteName}. All rights reserved.
      </div>
    </footer>
  );
}
