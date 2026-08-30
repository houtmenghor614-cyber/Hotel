import { Link } from 'react-router-dom';

import Icon from '../common/Icon.jsx';
import Img from '../common/Img.jsx';
import Stars from '../common/Stars.jsx';
import { formatPrice } from '../../utils/formatPrice.js';

/** Hotel card used on the Hotels listing page. */
export default function HotelCard({ hotel }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <Link to={`/hotels/${hotel.id}`} className="block relative h-52 overflow-hidden">
        <Img
          src={hotel.image}
          alt={hotel.name}
          fallback="hotel"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {hotel.star_rating > 0 && (
          <span className="absolute left-3 top-3 rounded-lg bg-slate-900/70 px-2 py-1 text-xs font-semibold text-amber-300">
            {'★'.repeat(hotel.star_rating)}
          </span>
        )}
      </Link>

      <div className="p-5">
        <Link to={`/hotels/${hotel.id}`}>
          <h3 className="font-semibold text-slate-800 group-hover:text-brand-700 transition">
            {hotel.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <Icon name="map-pin" className="w-3.5 h-3.5" />
          {hotel.city}
          {hotel.country ? `, ${hotel.country}` : ''}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Stars rating={hotel.avg_rating} className="w-3.5 h-3.5" />
          <span className="text-xs text-slate-500">
            {hotel.avg_rating ? `${hotel.avg_rating.toFixed(1)} (${hotel.review_count})` : 'No reviews yet'}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            {hotel.min_price ? (
              <>
                <span className="text-xs text-slate-500">From </span>
                <span className="text-lg font-bold text-brand-700">
                  {formatPrice(hotel.min_price, { compact: true })}
                </span>
                <span className="text-xs text-slate-500">/night</span>
              </>
            ) : (
              <span className="text-sm font-medium text-slate-500">Check prices</span>
            )}
          </div>
          <Link
            to={`/hotels/${hotel.id}`}
            className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
          >
            View details <Icon name="chevron-right" className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
