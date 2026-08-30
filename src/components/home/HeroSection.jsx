import { Link } from 'react-router-dom';

import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';
import { useSiteSettings } from '../../hooks/useSiteSettings.js';
import { uploadUrl } from '../../utils/uploads.js';

export default function HeroSection() {
  const site = useSiteSettings();
  const banner = uploadUrl(site.banner) || '/assets/banners/hero-1.jpg';
  const siteName = site.site_name || 'HotelBooking';

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <img
        src={banner}
        alt={siteName}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        onError={(e) => {
          e.currentTarget.src = '/assets/banners/hero-1.jpg';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:py-32">
        <div className="max-w-2xl fade-in">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-600/90 px-4 py-1.5 text-sm font-medium">
            <Icon name="plane" className="w-4 h-4" />
            Travel smarter, stay better
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight lg:text-5xl">
            Find Your Perfect Hotel
            <span className="block text-brand-300">at the Best Price</span>
          </h1>
          <p className="mt-4 max-w-xl text-slate-200">
            Browse hundreds of hotels, compare room types, read honest reviews
            and book your stay in just a few clicks.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => document.getElementById('search-box')?.scrollIntoView({ behavior: 'smooth' })} icon="search">
              Search Hotels
            </Button>
            <Link to="/hotels">
              <Button variant="outline" size="lg" className="!text-white !border-white/70 hover:!bg-white/10">
                Explore All Hotels
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="relative border-t border-white/10 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-4 py-6 text-center">
          {[
            { value: '500+', label: 'Hotels' },
            { value: '50k+', label: 'Happy Guests' },
            { value: '4.8/5', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-brand-300">{stat.value}</div>
              <div className="text-sm text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
