import Icon from '../common/Icon.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import { formatDate } from '../../utils/formatDate.js';

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  checked_in: 'bg-teal-50 text-teal-700 border-teal-200',
  checked_out: 'bg-violet-50 text-violet-700 border-violet-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

const PAYMENT_STYLES = {
  paid: 'bg-emerald-50 text-emerald-700',
  unpaid: 'bg-amber-50 text-amber-700',
  refunded: 'bg-slate-100 text-slate-600',
};

/** Status + payment badges and booking number for a completed booking. */
export default function BookingStatus({ booking, showAmount = true }) {
  const status = (booking.status || '').toLowerCase();
  const payment = (booking.payment_status || '').toLowerCase();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[status] || 'bg-slate-100 text-slate-600'}`}
        >
          {booking.status}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${PAYMENT_STYLES[payment] || 'bg-slate-100 text-slate-600'}`}
        >
          {booking.payment_status}
        </span>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500">Booking number</dt>
          <dd className="font-mono font-medium text-slate-800">{booking.booking_number}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Check-in</dt>
          <dd className="font-medium text-slate-800">{formatDate(booking.check_in_date)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Check-out</dt>
          <dd className="font-medium text-slate-800">{formatDate(booking.check_out_date)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Nights</dt>
          <dd className="font-medium text-slate-800">{booking.nights}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Guests</dt>
          <dd className="font-medium text-slate-800">{booking.num_guests}</dd>
        </div>
        {showAmount && (
          <div className="flex justify-between border-t border-slate-100 pt-2">
            <dt className="font-medium text-slate-600">Total paid</dt>
            <dd className="flex items-center gap-1 font-bold text-brand-700">
              <Icon name="wallet" className="w-4 h-4" />
              {formatPrice(booking.total_amount)}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
