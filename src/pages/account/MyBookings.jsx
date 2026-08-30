import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import Loading from '../../components/common/Loading.jsx';
import Pagination from '../../components/common/Pagination.jsx';
import BookingCard from '../../components/account/BookingCard.jsx';
import bookingApi from '../../api/bookingApi.js';

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'checked_in', label: 'Checked in' },
  { value: 'checked_out', label: 'Checked out' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function MyBookings() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    bookingApi
      .getMyBookings({ page, page_size: 6, status: status || undefined })
      .then(({ data: res }) => setData(res))
      .catch((err) => setError(err?.response?.data?.detail || 'Could not load bookings'))
      .finally(() => setLoading(false));
  }, [page, status]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Bookings</h1>
          <p className="text-sm text-slate-500">Track and manage your stays</p>
        </div>
        <Link to="/hotels">
          <Button icon="plus">Book a hotel</Button>
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="text-xs font-medium text-slate-500">Filter by status</label>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        {loading && <Loading text="Loading bookings..." />}
        {error && <ErrorMessage message={error} retry={load} />}
        {!loading && !error && (!data?.items?.length ? (
          <EmptyState
            icon="book"
            title="No bookings yet"
            description="When you book a hotel, your bookings will appear here."
            action={
              <Link to="/hotels">
                <Button>Find a hotel</Button>
              </Link>
            }
          />
        ) : (
          <>
            <div className="space-y-4">
              {data.items.map((booking) => (
                <BookingCard key={booking.id} booking={booking} onChanged={load} />
              ))}
            </div>
            <Pagination page={data.page} pages={data.pages} total={data.total} onChange={setPage} />
          </>
        ))}
      </div>
    </div>
  );
}
