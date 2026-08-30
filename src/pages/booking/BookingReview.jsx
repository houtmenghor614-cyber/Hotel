import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Icon from '../../components/common/Icon.jsx';
import BookingSummary from '../../components/booking/BookingSummary.jsx';
import GuestForm from '../../components/booking/GuestForm.jsx';
import CouponInput from '../../components/booking/CouponInput.jsx';
import PriceBreakdown from '../../components/booking/PriceBreakdown.jsx';
import bookingApi from '../../api/bookingApi.js';
import { useBooking } from '../../hooks/useBooking.js';
import { useAuth } from '../../hooks/useAuth.js';
import { calculateTotal } from '../../utils/calculateTotal.js';

/** Step 2 — review the draft, fill guest details and confirm the booking. */
export default function BookingReview() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { draft, guests, setGuests, coupon, setCoupon, resetBooking } = useBooking();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!draft?.hotel || !draft?.roomType) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <EmptyState
          icon="book"
          title="Nothing to review"
          description="Start by choosing a hotel and room type."
          action={
            <Link to="/hotels">
              <Button>Browse hotels</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const { hotel, roomType, checkIn, checkOut, guests: guestCount, nights, pricePerNight } = draft;
  const pricing = calculateTotal({ pricePerNight, checkIn, checkOut, coupon });

  const handleConfirm = async () => {
    const lead = guests[0];
    if (!lead?.full_name || !lead?.email) {
      setError('Please fill in the lead guest name and email.');
      return;
    }
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setError('Please select valid dates.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const { data } = await bookingApi.createBooking({
        hotel_id: hotel.id,
        room_type_id: roomType.id,
        check_in_date: checkIn,
        check_out_date: checkOut,
        num_guests: guestCount || guests.length || 1,
        adult_count: guestCount || guests.length || 1,
        child_count: 0,
        coupon_code: coupon?.code || null,
        special_requests: null,
        payment_method: 'on_site',
        guests: guests.map((g) => ({
          full_name: g.full_name,
          email: g.email || null,
          phone: g.phone || null,
          is_primary: Boolean(g.is_primary),
        })),
      });
      resetBooking();
      navigate(`/booking/success?booking_id=${data.id}`, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.detail || 'Could not complete the booking. Please try again.');
      setSubmitting(false);
    }
  };

  const addGuest = () =>
    setGuests([...guests, { full_name: '', email: '', phone: '', is_primary: false }]);
  const removeGuest = (index) => setGuests(guests.filter((_, i) => i !== index));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        to={hotel.id ? `/booking?hotel_id=${hotel.id}` : '/rooms'}
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600"
      >
        <Icon name="arrow-left" className="w-4 h-4" /> Change selection
      </Link>

      <h1 className="mt-3 text-3xl font-bold text-slate-800">Review & confirm</h1>
      <p className="mt-1 text-sm text-slate-500">
        {user ? `Booking as ${user.full_name}` : 'Please make sure your details are correct.'}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <GuestForm
            guests={guests}
            onChange={setGuests}
            onAdd={addGuest}
            onRemove={removeGuest}
          />
          <CouponInput subtotal={pricing.subtotal} coupon={coupon} onApply={setCoupon} />

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <Icon name="alert" className="w-4 h-4" /> {error}
            </div>
          )}

          <Button
            size="lg"
            className="w-full"
            loading={submitting}
            onClick={handleConfirm}
            icon="check"
          >
            Confirm booking
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <Icon name="shield" className="w-3.5 h-3.5" />
            By confirming you agree to our terms & cancellation policy.
          </p>
        </div>

        <aside className="space-y-6">
          <BookingSummary draft={draft} />
          <PriceBreakdown {...pricing} />
        </aside>
      </div>
    </div>
  );
}
