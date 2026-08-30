import { useEffect, useState } from 'react';

import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';
import { formatDate } from '../../utils/formatDate.js';
import bookingApi from '../../api/bookingApi.js';

/** Check availability for a room type over the selected dates. */
export default function RoomAvailability({ room, hotelId, checkIn, checkOut, numGuests }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const canCheck = hotelId && checkIn && checkOut && checkOut > checkIn;

  useEffect(() => {
    if (!canCheck) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setResult(null);
    bookingApi
      .checkAvailability({
        hotel_id: hotelId,
        check_in_date: checkIn,
        check_out_date: checkOut,
        num_guests: numGuests,
      })
      .then(({ data }) => {
        if (!cancelled) {
          const found = data.room_types.find((rt) => rt.room_type_id === room.id);
          setResult(found);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err?.response?.data?.detail || 'Availability check failed');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelId, room.id, checkIn, checkOut, numGuests]);

  if (!canCheck) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">
        <Icon name="calendar" className="w-4 h-4" />
        Select check-in and check-out dates to see availability.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">
        <Icon name="refresh" className="w-4 h-4 animate-spin" />
        Checking availability...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
    );
  }

  if (!result) return null;

  const available = result.available_rooms > 0;

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm ${
        available ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon name={available ? 'checkCircle' : 'alert'} className="w-4 h-4" />
        {available
          ? `${result.available_rooms} room${result.available_rooms > 1 ? 's' : ''} available`
          : 'Fully booked for these dates'}
      </span>
      {available && (
        <Button size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Book now
        </Button>
      )}
    </div>
  );
}
