import { formatPrice } from '../../utils/formatPrice.js';
import { calculateTotal } from '../../utils/calculateTotal.js';
import { formatDate } from '../../utils/formatDate.js';

/** Shows price per night and a live total for the selected dates. */
export default function RoomPrice({ room, checkIn, checkOut, coupon }) {
  const pricing = calculateTotal({
    pricePerNight: room.price_per_night,
    checkIn,
    checkOut,
    coupon,
  });

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-slate-500">Price per night</span>
        <span className="text-2xl font-bold text-brand-700">
          {formatPrice(room.price_per_night)}
        </span>
      </div>

      <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>
            {pricing.nights} night{pricing.nights > 1 ? 's' : ''}
            {checkIn && ` · ${formatDate(checkIn, { month: 'short', day: 'numeric' })} → ${formatDate(checkOut, { month: 'short', day: 'numeric' })}`}
          </span>
          <span>{formatPrice(room.price_per_night)} × {pricing.nights}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>{formatPrice(pricing.subtotal)}</span>
        </div>
        {pricing.discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Discount</span>
            <span>-{formatPrice(pricing.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-600">
          <span>Tax (10%)</span>
          <span>{formatPrice(pricing.tax)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="font-semibold text-slate-800">Total</span>
        <span className="text-xl font-bold text-brand-700">{formatPrice(pricing.total)}</span>
      </div>
    </div>
  );
}
