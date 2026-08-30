import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '../components/common/Button.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import Icon from '../components/common/Icon.jsx';
import Loading from '../components/common/Loading.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Select from '../components/common/Select.jsx';
import RoomCard from '../components/room/RoomCard.jsx';
import hotelApi from '../api/hotelApi.js';
import roomTypeApi from '../api/roomTypeApi.js';
import { useBooking } from '../hooks/useBooking.js';
import { toInputDate } from '../utils/formatDate.js';

export default function Rooms() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { search, updateSearch, updateDraft } = useBooking();

  const [hotelId, setHotelId] = useState(searchParams.get('hotel_id') || '');
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [checkIn, setCheckIn] = useState(
    search.checkIn || toInputDate(new Date(Date.now() + 24 * 3600 * 1000))
  );
  const [checkOut, setCheckOut] = useState(search.checkOut || '');
  const [guests, setGuests] = useState(search.guests || 2);

  useEffect(() => {
    hotelApi
      .getHotels({ page: 1, page_size: 100 })
      .then(({ data: res }) => setHotels(res.items || []))
      .catch(() => setHotels([]));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    roomTypeApi
      .getRoomTypes({
        page,
        page_size: 12,
        hotel_id: hotelId || undefined,
      })
      .then(({ data: res }) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.response?.data?.detail || 'Could not load rooms');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page, hotelId]);

  const handleBook = (room) => {
    updateSearch({ checkIn, checkOut, guests });
    updateDraft({
      hotel: { id: room.hotel_id, name: room.hotel_name || 'Hotel', city: '' },
      roomType: room,
      checkIn,
      checkOut,
      guests,
      nights: checkOut ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86_400_000)) : 1,
      pricePerNight: room.price_per_night,
    });
    navigate('/booking/review');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800">Browse Rooms</h1>
      <div className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="w-full sm:w-60">
          <label className="mb-1 block text-xs font-medium text-slate-500">Hotel</label>
          <Select
            value={hotelId}
            onChange={(e) => {
              setHotelId(e.target.value);
              setPage(1);
            }}
            options={[
              { value: '', label: 'All hotels' },
              ...hotels.map((hotel) => ({ value: String(hotel.id), label: hotel.name })),
            ]}
          />
        </div>
        <div className="w-full sm:w-44">
          <label className="mb-1 block text-xs font-medium text-slate-500">Check-in</label>
          <input
            type="date"
            value={checkIn}
            min={toInputDate(new Date())}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div className="w-full sm:w-44">
          <label className="mb-1 block text-xs font-medium text-slate-500">Check-out</label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || toInputDate(new Date())}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div className="w-full sm:w-40">
          <label className="mb-1 block text-xs font-medium text-slate-500">Guests</label>
          <Select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            options={[1, 2, 3, 4, 5, 6].map((n) => ({ value: n, label: `${n} guest${n > 1 ? 's' : ''}` }))}
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          icon="close"
          onClick={() => {
            setHotelId('');
            setPage(1);
          }}
        >
          Reset
        </Button>
      </div>

      <div className="mt-8">
        {loading && <Loading text="Loading rooms..." />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (!data?.items?.length ? (
          <EmptyState
            icon="bed"
            title="No rooms found"
            description="Try a different hotel or clear the filters."
          />
        ) : (
          <>
            <p className="mb-4 flex items-center gap-2 text-sm text-slate-500">
              <Icon name="bed" className="w-4 h-4" />
              {data.total} room type{data.total > 1 ? 's' : ''} available
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.items.map((room) => (
                <RoomCard key={room.id} room={room} onBook={handleBook} />
              ))}
            </div>
            <Pagination page={data.page} pages={data.pages} total={data.total} onChange={setPage} />
          </>
        ))}
      </div>
    </div>
  );
}

