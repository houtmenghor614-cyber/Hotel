import { useState } from 'react';

import Button from '../common/Button.jsx';
import EmptyState from '../common/EmptyState.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import Loading from '../common/Loading.jsx';
import Pagination from '../common/Pagination.jsx';
import ReviewCard from '../review/ReviewCard.jsx';
import ReviewForm from '../review/ReviewForm.jsx';
import reviewApi from '../../api/reviewApi.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useFetch } from '../../hooks/useFetch.js';

export default function HotelReviews({ hotel }) {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const { data, loading, error, refetch } = useFetch(
    () => reviewApi.getHotelReviews(hotel.id, { page, page_size: 5 }).then((r) => r.data),
    [hotel.id, page]
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-800">Guest Reviews</h2>
        {user && (
          <Button
            variant="outline"
            size="sm"
            icon="edit"
            onClick={() => setShowForm((show) => !show)}
          >
            {showForm ? 'Hide review form' : 'Write a review'}
          </Button>
        )}
      </div>

      {showForm && user && (
        <div className="mt-4 rounded-lg border border-brand-100 bg-brand-50/50 p-4">
          <ReviewForm
            hotel={hotel}
            onSuccess={() => {
              setShowForm(false);
              refetch();
            }}
          />
        </div>
      )}

      <div className="mt-6">
        {loading && <Loading text="Loading reviews..." />}
        {error && <ErrorMessage message={error} retry={refetch} />}
        {!loading && !error && (!data?.items?.length ? (
          <EmptyState
            icon="quote"
            title="No reviews yet"
            description="Be the first to share your experience!"
          />
        ) : (
          <>
            <div className="space-y-4">
              {data.items.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            <Pagination
              page={data.page}
              pages={data.pages}
              total={data.total}
              onChange={setPage}
            />
          </>
        ))}
      </div>
    </div>
  );
}
