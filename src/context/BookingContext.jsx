import { createContext, useMemo, useState } from 'react';

export const BookingContext = createContext(null);

/** Holds search parameters and the in-progress booking draft. */
export function BookingProvider({ children }) {
  // Search form state (used on Home / Hotels / SearchResults)
  const [search, setSearch] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
  });

  // Current booking draft
  const [draft, setDraft] = useState(null);

  // Filled guest list from the GuestForm step
  const [guests, setGuests] = useState([]);

  // Applied coupon (validated server-side)
  const [coupon, setCoupon] = useState(null);

  const updateSearch = (patch) =>
    setSearch((prev) => ({ ...prev, ...patch }));

  const updateDraft = (patch) =>
    setDraft((prev) => ({ ...(prev || {}), ...patch }));

  const resetBooking = () => {
    setDraft(null);
    setGuests([]);
    setCoupon(null);
  };

  const value = useMemo(
    () => ({
      search,
      updateSearch,
      draft,
      updateDraft,
      guests,
      setGuests,
      coupon,
      setCoupon,
      resetBooking,
    }),
    [search, draft, guests, coupon]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export default BookingContext;
