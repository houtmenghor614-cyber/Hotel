import { Link } from 'react-router-dom';

import Button from '../common/Button.jsx';
import EmptyState from '../common/EmptyState.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import Loading from '../common/Loading.jsx';
import HotelCard from './HotelCard.jsx';
import hotelApi from '../../api/hotelApi.js';
import { useFetch } from '../../hooks/useFetch.js';

export default function PopularHotels() {
  const { data, loading, error, refetch } = useFetch(() =>
    hotelApi.getHotels({ page: 1, page_size: 6, sort: 'rating_desc' }).then((r) => r.data)
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Popular Hotels</h2>
          <p className="mt-1 text-sm text-slate-500">
            Hand-picked stays loved by our guests
          </p>
        </div>
        <Link to="/hotels">
          <Button variant="outline" size="sm" icon="arrow-right">
            View all
          </Button>
        </Link>
      </div>

      <div className="mt-8">
        {loading && <Loading text="Loading hotels..." />}
        {error && <ErrorMessage message={error} retry={refetch} />}
        {!loading && !error && (!data?.items?.length ? (
          <EmptyState icon="building" title="No hotels found" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
