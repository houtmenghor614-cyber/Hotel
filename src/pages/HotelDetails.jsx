import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Button from '../components/common/Button.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import Icon from '../components/common/Icon.jsx';
import Loading from '../components/common/Loading.jsx';
import HotelGallery from '../components/hotel/HotelGallery.jsx';
import HotelInfo from '../components/hotel/HotelInfo.jsx';
import HotelRating from '../components/hotel/HotelRating.jsx';
import HotelAmenities from '../components/hotel/HotelAmenities.jsx';
import HotelLocation from '../components/hotel/HotelLocation.jsx';
import HotelReviews from '../components/hotel/HotelReviews.jsx';
import DateSelector from '../components/booking/DateSelector.jsx';
import GuestSelector from '../components/booking/GuestSelector.jsx';
import hotelApi from '../api/hotelApi.js';
import { useAuth } from '../hooks/useAuth.js';
import { useBooking } from '../hooks/useBooking.js';
import { formatPrice } from '../utils/formatPrice.js';
import { toInputDate } from '../utils/formatDate.js';

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { search, updateSearch, updateDraft } = useBooking();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [checkIn, setCheckIn] = useState(
    search.checkIn || toInputDate(new Date(Date.now() + 24 * 3600 * 1000))
  );
  const [checkOut, setCheckOut] = useState(search.checkOut || '');
  const [guests, setGuests] = useState(search.guests || 2);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    hotelApi
      .getHotel(id)
      .then(({ data }) => {
        if (!cancelled) {
          setHotel(data);
          setSelectedRoom(data.room_types?.[0]?.id || null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err?.response?.data?.detail || 'Hotel not found');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleBook = () => {
    if (!selectedRoom || !hotel) return;
    const roomType = hotel.room_types.find((rt) => rt.id === Number(selectedRoom));
    if (!roomType) return;
    const nights = checkOut
      ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86_400_000))
      : 1;
    updateSearch({ checkIn, checkOut, guests });
    updateDraft({
      hotel,
      roomType,
      checkIn,
      checkOut,
      guests,
      nights: nights || 1,
      pricePerNight: roomType.price_per_night,
    });
    navigate('/booking/review');
  };

  if (loading) return <Loading full text="Loading hotel..." />;
  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <ErrorMessage message={error} />
        <Link to="/hotels" className="mt-4 inline-block text-sm text-brand-600 hover:underline">
          ← Back to hotels
        </Link>
      </div>
    );
  }
  if (!hotel) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <Icon name="chevron-right" className="w-4 h-4" />
        <Link to="/hotels" className="hover:text-brand-600">Hotels</Link>
        <Icon name="chevron-right" className="w-4 h-4" />
        <span className="font-medium text-slate-700">{hotel.name}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{hotel.name}</h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <Icon name="map-pin" className="w-4 h-4" />
            {hotel.address}, {hotel.city}
          </p>
          <div className="mt-2">
            <HotelRating hotel={hotel} />
          </div>
        </div>
        {!user && (
          <Link to="/login">
            <Button variant="outline" size="sm" icon="heart">
              Save to favorites
            </Button>
          </Link>
        )}
      </div>

      {/* Gallery */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left column */}
        <div className="space-y-8">
          <HotelInfo hotel={hotel} />

          {hotel.amenities?.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800">Amenities</h2>
              <div className="mt-4">
                <HotelAmenities amenities={hotel.amenities} />
              </div>
            </div>
          )}

          <HotelLocation hotel={hotel} />
          <HotelReviews hotel={hotel} />
        </div>

        {/* Booking widget */}
        <aside className="lg:sticky lg:top-24 h-fit space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">Book your stay</h2>
            <div className="mt-4 space-y-4">
              <DateSelector
                checkIn={checkIn}
                checkOut={checkOut}
                onCheckIn={setCheckIn}
                onCheckOut={setCheckOut}
              />
              <GuestSelector value={guests} onChange={setGuests} />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Room type</label>
                <select
                  value={selectedRoom || ''}
                  onChange={(e) => setSelectedRoom(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                >
                  {(hotel.room_types || []).map((rt) => (
                    <option key={rt.id} value={rt.id}>
                      {rt.name} — {formatPrice(rt.price_per_night, { compact: true })}/night
                    </option>
                  ))}
                </select>
              </div>

              {checkOut && checkOut > checkIn && (
                <p className="text-xs text-slate-500">
                  {Math.round((new Date(checkOut) - new Date(checkIn)) / 86_400_000)} night(s) selected
                </p>
              )}

              <Button className="w-full" size="lg" icon="arrow-right" onClick={handleBook}>
                Book now
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <Icon name="shield" className="w-3.5 h-3.5" /> Secure · Free cancellation on most bookings
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

