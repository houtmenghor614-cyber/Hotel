import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '../../components/common/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import Icon from '../../components/common/Icon.jsx';
import Loading from '../../components/common/Loading.jsx';
import BookingForm from '../../components/booking/BookingForm.jsx';
import hotelApi from '../../api/hotelApi.js';

/**
 * Step 1 — /booking?hotel_id=..
 * Loads the hotel and lets the guest pick dates, guest count and room type.
 */
export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hotelId = searchParams.get('hotel_id');

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(Boolean(hotelId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hotelId) {
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    hotelApi
      .getHotel(hotelId)
      .then(({ data }) => {
        if (!cancelled) setHotel(data);
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
  }, [hotelId]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        to="/hotels"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600"
      >
        <Icon name="arrow-left" className="w-4 h-4" /> Back to hotels
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-slate-800">Book your stay</h1>
      <p className="mt-1 text-sm text-slate-500">
        Select your dates and a room type to continue
      </p>

      {loading && <Loading full text="Loading hotel..." />}
      {error && (
        <div className="mt-6">
          <ErrorMessage message={error} />
          <Button className="mt-4" onClick={() => navigate('/hotels')}>
            Browse hotels
          </Button>
        </div>
      )}
      {!loading && !error && hotel && (
        <div className="mt-6">
          <BookingForm hotel={hotel} />
        </div>
      )}
    </div>
  );
}
