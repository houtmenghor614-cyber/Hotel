import { Link } from 'react-router-dom';

import Icon from '../common/Icon.jsx';
import Img from '../common/Img.jsx';
import { formatPrice } from '../../utils/formatPrice.js';

export default function RoomCard({ room, hotel }) {
  const hotelName = room.hotel_name || hotel?.name || 'Hotel';
  const image = room.image || room.images?.[0];

  return (
    <Link
      to={`/rooms/${room.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-40 overflow-hidden">
        <Img
          src={image}
          alt={room.name}
          fallback="room"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {room.max_guests > 0 && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-slate-900/70 px-2 py-1 text-xs text-white backdrop-blur">
            <Icon name="users" className="w-3.5 h-3.5" />
            {room.max_guests}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 group-hover:text-brand-700 transition">
          {room.name}
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          {hotelName} · {room.bed_type || 'Bed available'}
        </p>
        <div className="mt-3 flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <span className="text-lg font-bold text-brand-700">
              {formatPrice(room.price_per_night, { compact: true })}
            </span>
            <span className="text-xs text-slate-500">/night</span>
          </div>
          <span className="text-xs font-medium text-brand-600 group-hover:underline">
            Book now
          </span>
        </div>
      </div>
    </Link>
  );
}
