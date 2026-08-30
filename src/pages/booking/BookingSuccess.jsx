import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import Icon from '../../components/common/Icon.jsx';
import Loading from '../../components/common/Loading.jsx';
import BookingStatus from '../../components/booking/BookingStatus.jsx';
import Img from '../../components/common/Img.jsx';
import bookingApi from '../../api/bookingApi.js';
import { formatPrice } from '../../utils/formatPrice.js';

/** Step 3 — confirmation page showing the created booking. */
export default function BookingSuccess() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('booking_id');

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(Boolean(bookingId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookingId) {
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    bookingApi
      .getBooking(bookingId)
      .then(({ data }) => {
        if (!cancelled) setBooking(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.response?.data?.detail || 'Could not load booking');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [bookingId]);

  if (loading) return <Loading full text="Loading your booking..." />;

  if (!booking || error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        {error && <ErrorMessage message={error} />}
        <EmptyState
          icon="book"
          title="No booking found"
          description="We could not find a booking for this link."
          action={
            <Link to="/">
              <Button>Go to homepage</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
          <Icon name="checkCircle" className="w-8 h-8" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-800">Booking confirmed!</h1>
        <p className="mt-1 text-sm text-slate-600">
          A confirmation has been prepared. Show your booking number at check-in.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link to="/account/bookings">
            <Button variant="outline" icon="book">
              View my bookings
            </Button>
          </Link>
          <Link to="/">
            <Button icon="home">Back to home</Button>
          </Link>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {booking.hotel?.image && (
          <Img
            src={booking.hotel.image}
            alt={booking.hotel.name}
            fallback="hotel"
            className="h-40 w-full object-cover"
          />
        )}
        <div className="p-6">
          <h2 className="text-lg font-bold text-slate-800">{booking.hotel?.name}</h2>
          <p className="text-sm text-slate-500">
            {booking.room_type?.name} · {booking.hotel?.city}
          </p>
          <div className="mt-4">
            <BookingStatus booking={booking} />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {booking.guests?.length > 0 && (
              <div className="rounded-lg bg-slate-50 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Guests
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {booking.guests.map((guest, index) => (
                    <li key={index}>
                      {guest.full_name}
                      {guest.is_primary ? ' (Lead)' : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total
              </h3>
              <p className="mt-1 text-lg font-bold text-brand-700">
                {formatPrice(booking.total_amount)}
              </p>
              {booking.payment_status === 'unpaid' && (
                <p className="text-xs text-slate-500">Payable on-site at check-in</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
