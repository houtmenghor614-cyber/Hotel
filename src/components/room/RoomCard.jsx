import Icon from '../common/Icon.jsx';
import Img from '../common/Img.jsx';
import { formatPrice } from '../../utils/formatPrice.js';

/** Room type card with a "Book" action. */
export default function RoomCard({ room, onBook, hotelName }) {
  const image = room.image || room.images?.[0];

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-44 overflow-hidden">
        <Img src={image} alt={room.name} fallback="room" className="h-full w-full object-cover" />
        {room.max_guests > 0 && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-slate-900/70 px-2 py-1 text-xs text-white">
            <Icon name="users" className="w-3.5 h-3.5" /> {room.max_guests}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-slate-800">{room.name}</h3>
        <p className="mt-1 text-xs text-slate-500">
          {hotelName || room.hotel_name || ''}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <Icon name="bed" className="w-4 h-4 text-slate-400" />
            {room.bed_type || 'Bed'}
          </span>
          {room.size_sqft ? (
            <span className="flex items-center gap-1.5">
              <Icon name="building" className="w-4 h-4 text-slate-400" />
              {room.size_sqft} m²
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3 mt-auto">
          <div>
            <span className="text-xs text-slate-500">From </span>
            <span className="text-lg font-bold text-brand-700">
              {formatPrice(room.price_per_night, { compact: true })}
            </span>
            <span className="text-xs text-slate-500">/night</span>
          </div>
          {onBook && (
            <button
              type="button"
              onClick={() => onBook(room)}
              className="flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              Book <Icon name="chevron-right" className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
