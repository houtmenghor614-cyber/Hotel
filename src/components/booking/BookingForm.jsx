import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../common/Button.jsx';
import EmptyState from '../common/EmptyState.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import Icon from '../common/Icon.jsx';
import Loading from '../common/Loading.jsx';
import DateSelector from './DateSelector.jsx';
import GuestSelector from './GuestSelector.jsx';
import roomTypeApi from '../../api/roomTypeApi.js';
import { useBooking } from '../../hooks/useBooking.js';
import { useFetch } from '../../hooks/useFetch.js';
import { toInputDate } from '../../utils/formatDate.js';

/** Step 1 of the booking flow: pick dates, guest count and a room type. */
export default function BookingForm({ hotel, initialRoomTypeId }) {
  const navigate = useNavigate();
  const { search, updateSearch, updateDraft } = useBooking();

  const [checkIn, setCheckIn] = useState(
    search.checkIn || toInputDate(new Date(Date.now() + 24 * 3600 * 1000))
  );
  const [checkOut, setCheckOut] = useState(search.checkOut || '');
  const [guests, setGuests] = useState(search.guests || 2);
  const [selected, setSelected] = useState(initialRoomTypeId || '');
  const [error, setError] = useState(null);

  const { data, loading, fetchError } = useFetch(() =>
    roomTypeApi.getRoomTypes({ hotel_id: hotel.id }).then((r) => r.data)
  );

  useEffect(() => {
    if (data?.items?.length && !selected) {
      setSelected(data.items[0].id);
    }
  }, [data, selected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      setError('Please choose a room type');
      return;
    }
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setError('Please select a valid check-in and check-out date');
      return;
    }
    const roomType = data.items.find((item) => item.id === Number(selected));
    if (!roomType) {
      setError('Selected room type was not found');
      return;
    }
    setError(null);
    updateSearch({ checkIn, checkOut, guests });
    updateDraft({
      hotel,
      roomType,
      checkIn,
      checkOut,
      guests,
      nights: Math.round((new Date(checkOut) - new Date(checkIn)) / 86_400_000),
      pricePerNight: roomType.price_per_night,
    });
    navigate('/booking/review');
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800">Book your stay</h2>

      <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        <DateSelector
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckIn={setCheckIn}
          onCheckOut={setCheckOut}
        />
        <GuestSelector value={guests} onChange={setGuests} />

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Choose a room type
          </label>
          {loading && <Loading text="Loading room types..." />}
          {fetchError && <ErrorMessage message={fetchError} />}
          {!loading && !fetchError && (
            data?.items?.length ? (
              <div className="space-y-2">
                {data.items.map((room) => (
                  <label
                    key={room.id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${
                      Number(selected) === room.id
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-slate-200 hover:border-brand-300'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="roomType"
                        value={room.id}
                        checked={Number(selected) === room.id}
                        onChange={() => setSelected(room.id)}
                        className="h-4 w-4 text-brand-600 focus:ring-brand-500"
                      />
                      <span>
                        <span className="block text-sm font-medium text-slate-800">{room.name}</span>
                        <span className="flex items-center gap-2 text-xs text-slate-500">
                          <Icon name="users" className="w-3.5 h-3.5" /> {room.max_guests} guests
                          {room.bed_type ? ` · ${room.bed_type}` : ''}
                        </span>
                      </span>
                    </span>
                    <span className="text-sm font-bold text-brand-700">
                      {new Intl.NumberFormat('vi-VN').format(room.price_per_night)}đ
                      <span className="text-xs font-normal text-slate-500">/night</span>
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <EmptyState icon="bed" title="No room types available" />
            )
          )}
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <Button type="submit" size="lg" className="w-full" icon="arrow-right" disabled={!data?.items?.length}>
          Continue to review
        </Button>
      </form>
    </div>
  );
}
