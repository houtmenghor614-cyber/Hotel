import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';
import Img from '../common/Img.jsx';
import bookingApi from '../../api/bookingApi.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { formatDate } from '../../utils/formatDate.js';

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-700',
  confirmed: 'bg-blue-50 text-blue-700',
  checked_in: 'bg-teal-50 text-teal-700',
  checked_out: 'bg-violet-50 text-violet-700',
  completed: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-red-50 text-red-700',
};

export default function BookingCard({ booking, onChanged }) {
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setCancelling(true);
    try {
      await bookingApi.cancelBooking(booking.id);
      onChanged?.();
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err?.response?.data?.detail || 'Could not cancel booking');
    } finally {
      setCancelling(false);
    }
  };

  const canCancel = ['pending', 'confirmed', 'checked_in'].includes(booking.status);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
      <Link to={`/account/bookings/${booking.id}`} className="block h-32 w-full shrink-0 overflow-hidden rounded-lg sm:w-44">
        <Img
          src={booking.hotel?.image}
          alt={booking.hotel?.name}
          fallback="hotel"
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <Link
              to={`/account/bookings/${booking.id}`}
              className="font-semibold text-slate-800 hover:text-brand-700"
            >
              {booking.hotel?.name || 'Hotel'}
            </Link>
            <p className="text-xs text-slate-500">
              {booking.room_type?.name} · {formatDate(booking.check_in_date)} →{' '}
              {formatDate(booking.check_out_date)} · {booking.nights} nights
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
              STATUS_STYLES[booking.status] || 'bg-slate-100 text-slate-600'
            }`}
          >
            {booking.status}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-mono text-xs text-slate-400">{booking.booking_number}</span>
            <span className="font-bold text-brand-700">{formatPrice(booking.total_amount)}</span>
          </div>
          <div className="flex gap-2">
            <Link to={`/account/bookings/${booking.id}`}>
              <Button variant="outline" size="sm" icon="eye">
                Details
              </Button>
            </Link>
            {canCancel && (
              <Button
                variant="danger"
                size="sm"
                loading={cancelling}
                onClick={handleCancel}
                icon="x"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
