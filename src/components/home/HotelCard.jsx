import { Link } from 'react-router-dom';

import Icon from '../common/Icon.jsx';
import Img from '../common/Img.jsx';
import Stars from '../common/Stars.jsx';
import { formatPrice } from '../../utils/formatPrice.js';

export default function HotelCard({ hotel }) {
  return (
    <Link
      to={`/hotels/${hotel.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        <Img
          src={hotel.image}
          alt={hotel.name}
          fallback="hotel"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {hotel.star_rating > 0 && (
          <span className="absolute left-3 top-3 rounded-lg bg-slate-900/70 px-2.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur">
            {'★'.repeat(hotel.star_rating)}
          </span>
        )}
        {hotel.is_favorite && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-red-500">
            <Icon name="heart" className="w-4 h-4" />
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-800 group-hover:text-brand-700 transition">
          {hotel.name}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <Icon name="map-pin" className="w-3.5 h-3.5" />
          {hotel.city}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stars rating={hotel.avg_rating} />
            <span className="text-xs text-slate-500">
              {hotel.avg_rating ? hotel.avg_rating.toFixed(1) : 'New'}
            </span>
          </div>
        </div>

        <div className="mt-3 border-t border-slate-100 pt-3 text-right">
          {hotel.min_price ? (
            <>
              <span className="text-xs text-slate-500">From </span>
              <span className="text-lg font-bold text-brand-700">
                {formatPrice(hotel.min_price, { compact: true })}
              </span>
              <span className="text-xs text-slate-500">/night</span>
            </>
          ) : (
            <span className="text-sm font-medium text-brand-600">Check prices</span>
          )}
        </div>
      </div>
    </Link>
  );
}
