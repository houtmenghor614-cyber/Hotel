import { useContext } from 'react';

import { BookingContext } from '../context/BookingContext.jsx';

/** Convenience hook to consume the BookingContext. */
export function useBooking() {
  return useContext(BookingContext);
}

export default useBooking;
