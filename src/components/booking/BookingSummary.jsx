import { Link } from 'react-router-dom';

import Icon from '../common/Icon.jsx';
import Img from '../common/Img.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import { formatDate } from '../../utils/formatDate.js';

/** Compact summary of the booking draft (hotel, room, dates, guests). */
export default function BookingSummary({ draft }) {
  if (!draft?.hotel || !draft?.roomType) return null;

  const { hotel, roomType, checkIn, checkOut, guests, nights } = draft;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-36">
        <Img
          src={hotel.image}
          alt={hotel.name}
          fallback="hotel"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-lg bg-slate-900/70 px-2 py-1 text-xs text-white">
          {'★'.repeat(hotel.star_rating || 0)}
        </span>
      </div>

      <div className="p-5">
        <Link
          to={`/hotels/${hotel.id}`}
          className="text-base font-semibold text-slate-800 hover:text-brand-700"
        >
          {hotel.name}
        </Link>
        <p className="flex items-center gap-1 text-xs text-slate-500">
          <Icon name="map-pin" className="w-3.5 h-3.5" /> {hotel.city}
        </p>

        <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm">
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <Icon name="bed" className="w-4 h-4 text-brand-600" />
            {roomType.name}
          </div>
          <div className="mt-2 space-y-1.5 text-slate-600">
            <div className="flex items-center gap-2">
              <Icon name="calendar" className="w-4 h-4 text-brand-600" />
              {formatDate(checkIn)} → {formatDate(checkOut)}
              <span className="text-xs text-slate-400">({nights || 0} nights)</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="users" className="w-4 h-4 text-brand-600" />
              {guests || 1} guest{guests > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-sm text-slate-500">Per night</span>
          <span className="font-semibold text-brand-700">
            {formatPrice(roomType.price_per_night)}
          </span>
        </div>
      </div>
    </div>
  );
}
