import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import Icon from '../../components/common/Icon.jsx';
import Loading from '../../components/common/Loading.jsx';
import BookingStatus from '../../components/booking/BookingStatus.jsx';
import Img from '../../components/common/Img.jsx';
import bookingApi from '../../api/bookingApi.js';
import { formatPrice } from '../../utils/formatPrice.js';

export default function BookingDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    bookingApi
      .getBooking(id)
      .then(({ data }) => {
        if (!cancelled) setBooking(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.response?.data?.detail || 'Booking not found');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <Loading full text="Loading booking..." />;

  if (error || !booking) {
    return (
      <div>
        {error && <ErrorMessage message={error} />}
        <EmptyState
          icon="book"
          title="Booking not found"
          action={
            <Link to="/account/bookings">
              <Button>Back to my bookings</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/account/bookings"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600"
      >
        <Icon name="arrow-left" className="w-4 h-4" /> Back to my bookings
      </Link>

      <h1 className="mt-3 text-2xl font-bold text-slate-800">Booking Details</h1>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-72 shrink-0">
            <Img
              src={booking.hotel?.image}
              alt={booking.hotel?.name}
              fallback="hotel"
              className="h-48 w-full object-cover sm:h-full"
            />
          </div>
          <div className="flex-1 p-6">
            <h2 className="text-lg font-bold text-slate-800">{booking.hotel?.name}</h2>
            <p className="text-sm text-slate-500">
              {booking.hotel?.city} · {booking.room_type?.name}
            </p>
            {booking.room && (
              <p className="mt-1 text-xs text-slate-400">Room {booking.room.room_number}</p>
            )}
            <div className="mt-4">
              <BookingStatus booking={booking} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800">Payment</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(booking.subtotal)}</span>
            </div>
            {booking.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>-{formatPrice(booking.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatPrice(booking.tax)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2 font-bold text-slate-800">
              <span>Total</span>
              <span className="text-brand-700">{formatPrice(booking.total_amount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment method</span>
              <span className="capitalize">{booking.payment_method}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800">Guests</h3>
          {booking.guests?.length ? (
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {booking.guests.map((guest, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Icon name="user" className="w-4 h-4 text-brand-600" />
                  {guest.full_name}
                  {guest.is_primary && (
                    <span className="rounded bg-brand-50 px-1.5 py-0.5 text-xs text-brand-700">
                      Lead
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-500">No guest details provided.</p>
          )}
          {booking.special_requests && (
            <>
              <h4 className="mt-4 text-xs font-semibold uppercase text-slate-500">
                Special requests
              </h4>
              <p className="mt-1 text-sm text-slate-600">{booking.special_requests}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
