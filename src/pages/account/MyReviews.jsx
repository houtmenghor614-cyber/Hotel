import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import Icon from '../../components/common/Icon.jsx';
import Loading from '../../components/common/Loading.jsx';
import ReviewForm from '../../components/review/ReviewForm.jsx';
import Img from '../../components/common/Img.jsx';
import bookingApi from '../../api/bookingApi.js';
import { formatDate } from '../../utils/formatDate.js';

/**
 * My Reviews — the backend requires a completed stay before reviewing,
 * so this page shows completed bookings and lets the guest review each.
 */
export default function MyReviews() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewing, setReviewing] = useState(null);
  const [done, setDone] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    bookingApi
      .getMyBookings({ page: 1, page_size: 50 })
      .then(({ data: res }) => {
        setData(res);
        // keep reviewing state in sync after a review is submitted
        if (reviewing) {
          const stillThere = (res.items || []).some((b) => b.id === reviewing.id);
          if (!stillThere) setReviewing(null);
        }
      })
      .catch((err) => setError(err?.response?.data?.detail || 'Could not load bookings'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completed = (data?.items || []).filter((booking) =>
    ['completed', 'checked_out'].includes(booking.status)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">My Reviews</h1>
      <p className="text-sm text-slate-500">
        Review hotels you have stayed at — your feedback helps other travelers
      </p>

      <div className="mt-6">
        {loading && <Loading text="Loading your stays..." />}
        {error && <ErrorMessage message={error} retry={load} />}

        {done && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <Icon name="checkCircle" className="w-4 h-4" />
            Review submitted! It will be published once the hotel approves it.
          </div>
        )}

        {!loading && !error && (!completed.length ? (
          <EmptyState
            icon="quote"
            title="No completed stays yet"
            description="Once you have completed a stay, you can review it here."
            action={
              <Link to="/hotels">
                <Button>Book a stay</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {completed.map((booking) => (
              <div
                key={booking.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <Img
                    src={booking.hotel?.image}
                    alt={booking.hotel?.name}
                    fallback="hotel"
                    className="h-24 w-full rounded-lg object-cover sm:w-36"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">{booking.hotel?.name}</div>
                    <div className="text-xs text-slate-500">
                      {booking.room_type?.name} · Stayed {formatDate(booking.check_in_date)} →{' '}
                      {formatDate(booking.check_out_date)}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon="edit"
                    onClick={() => setReviewing(reviewing?.id === booking.id ? null : booking)}
                  >
                    {reviewing?.id === booking.id ? 'Cancel' : 'Write a review'}
                  </Button>
                </div>

                {reviewing?.id === booking.id && (
                  <div className="border-t border-slate-100 bg-brand-50/40 p-4">
                    <ReviewForm
                      hotel={booking.hotel}
                      bookingId={booking.id}
                      onSuccess={() => {
                        setDone(true);
                        setReviewing(null);
                        load();
                        window.setTimeout(() => setDone(false), 5000);
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
