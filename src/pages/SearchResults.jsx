import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Button from '../components/common/Button.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import Icon from '../components/common/Icon.jsx';
import Loading from '../components/common/Loading.jsx';
import Pagination from '../components/common/Pagination.jsx';
import HotelCard from '../components/hotel/HotelCard.jsx';
import hotelApi from '../api/hotelApi.js';
import { useBooking } from '../hooks/useBooking.js';
import { formatDate } from '../utils/formatDate.js';
import { calculateNights } from '../utils/calculateNights.js';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const { search } = useBooking();

  const city = searchParams.get('city') || search.city || '';
  const checkIn = searchParams.get('checkIn') || search.checkIn || '';
  const checkOut = searchParams.get('checkOut') || search.checkOut || '';
  const guests = Number(searchParams.get('guests')) || search.guests || 2;

  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    hotelApi
      .getHotels({ page, page_size: 9, city: city || undefined })
      .then(({ data: res }) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.response?.data?.detail || 'Search failed');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page, city]);

  const nights = calculateNights(checkIn, checkOut);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800">Search Results</h1>

      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
        <span className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-brand-700">
          <Icon name="map-pin" className="w-3.5 h-3.5" />
          {city || 'All cities'}
        </span>
        {checkIn && (
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-600">
            <Icon name="calendar" className="w-3.5 h-3.5" />
            {formatDate(checkIn)} → {checkOut ? formatDate(checkOut) : '?'}
            {nights > 0 ? ` (${nights} night${nights > 1 ? 's' : ''})` : ''}
          </span>
        )}
        <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-600">
          <Icon name="users" className="w-3.5 h-3.5" />
          {guests} guest{guests > 1 ? 's' : ''}
        </span>
        <Link to="/hotels" className="ml-auto">
          <Button variant="ghost" size="sm" icon="filter">
            Refine search
          </Button>
        </Link>
      </div>

      <div className="mt-8">
        {loading && <Loading text="Searching hotels..." />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (!data?.items?.length ? (
          <EmptyState
            icon="search"
            title="No hotels found"
            description={
              city
                ? `We could not find hotels in "${city}". Try another city or browse all hotels.`
                : 'Try a different search or browse all hotels.'
            }
            action={
              <Link to="/hotels">
                <Button>Browse all hotels</Button>
              </Link>
            }
          />
        ) : (
          <>
            <p className="mb-4 text-sm text-slate-500">
              {data.total} hotel{data.total > 1 ? 's' : ''} found
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
            <Pagination page={data.page} pages={data.pages} total={data.total} onChange={setPage} />
          </>
        ))}
      </div>
    </div>
  );
}
