import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Button from '../components/common/Button.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import Icon from '../components/common/Icon.jsx';
import Loading from '../components/common/Loading.jsx';
import RoomGallery from '../components/room/RoomGallery.jsx';
import RoomInfo from '../components/room/RoomInfo.jsx';
import RoomAmenities from '../components/room/RoomAmenities.jsx';
import RoomPrice from '../components/room/RoomPrice.jsx';
import DateSelector from '../components/booking/DateSelector.jsx';
import GuestSelector from '../components/booking/GuestSelector.jsx';
import roomTypeApi from '../api/roomTypeApi.js';
import { useBooking } from '../hooks/useBooking.js';
import { toInputDate } from '../utils/formatDate.js';

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { search, updateSearch, updateDraft } = useBooking();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [checkIn, setCheckIn] = useState(
    search.checkIn || toInputDate(new Date(Date.now() + 24 * 3600 * 1000))
  );
  const [checkOut, setCheckOut] = useState(search.checkOut || '');
  const [guests, setGuests] = useState(search.guests || 2);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    roomTypeApi
      .getRoomType(id)
      .then(({ data }) => {
        if (!cancelled) setRoom(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.response?.data?.detail || 'Room type not found');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleBook = () => {
    if (!room) return;
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

  if (loading) return <Loading full text="Loading room..." />;
  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <ErrorMessage message={error} />
        <Link to="/rooms" className="mt-4 inline-block text-sm text-brand-600 hover:underline">
          ← Back to rooms
        </Link>
      </div>
    );
  }
  if (!room) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <Icon name="chevron-right" className="w-4 h-4" />
        <Link to="/rooms" className="hover:text-brand-600">Rooms</Link>
        <Icon name="chevron-right" className="w-4 h-4" />
        <span className="font-medium text-slate-700">{room.name}</span>
      </nav>

      <div className="mt-4">
        <h1 className="text-3xl font-bold text-slate-800">{room.name}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {room.hotel_name && (
            <>
              <Link to={`/hotels/${room.hotel_id}`} className="text-brand-600 hover:underline">
                {room.hotel_name}
              </Link>
              {' · '}
            </>
          )}
          {room.bed_type || 'Standard bed'}
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <RoomGallery room={room} />
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <RoomInfo room={room} />
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">Amenities</h2>
            <div className="mt-4">
              <RoomAmenities amenityNames={room.amenity_names} />
            </div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 h-fit">
          <RoomPrice room={room} checkIn={checkIn} checkOut={checkOut} />
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <DateSelector
              checkIn={checkIn}
              checkOut={checkOut}
              onCheckIn={setCheckIn}
              onCheckOut={setCheckOut}
            />
            <div className="mt-4">
              <GuestSelector value={guests} onChange={setGuests} />
            </div>
            <Button className="mt-5 w-full" size="lg" icon="arrow-right" onClick={handleBook}>
              Book this room
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
