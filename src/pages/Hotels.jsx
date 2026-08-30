import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from '../components/common/Button.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import Icon from '../components/common/Icon.jsx';
import Loading from '../components/common/Loading.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Select from '../components/common/Select.jsx';
import HotelCard from '../components/hotel/HotelCard.jsx';
import hotelApi from '../api/hotelApi.js';
import { useDebounce } from '../hooks/useDebounce.js';

export default function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [starRating, setStarRating] = useState(searchParams.get('stars') || '');
  const [sort, setSort] = useState('created_desc');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedCity = useDebounce(city, 400);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedCity) params.set('city', debouncedCity);
    if (starRating) params.set('stars', starRating);
    params.set('page', String(page));
    params.set('sort', sort);
    setSearchParams(params, { replace: true });

    let cancelled = false;
    setLoading(true);
    setError(null);
    hotelApi
      .getHotels({
        page,
        page_size: 9,
        city: debouncedCity || undefined,
        star_rating: starRating || undefined,
        sort,
      })
      .then(({ data: res }) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.response?.data?.detail || 'Could not load hotels');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, debouncedCity, starRating, sort, setSearchParams]);

  const cities = [...new Set((data?.items || []).map((hotel) => hotel.city).filter(Boolean))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800">Explore Hotels</h1>
      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="w-full sm:w-56">
          <label className="mb-1 block text-xs font-medium text-slate-500">City</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <Icon name="search" className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setPage(1);
              }}
              placeholder="Search by city..."
              list="hotel-cities"
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <datalist id="hotel-cities">
              {cities.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="w-full sm:w-44">
          <label className="mb-1 block text-xs font-medium text-slate-500">Star rating</label>
          <Select
            value={starRating}
            onChange={(e) => {
              setStarRating(e.target.value);
              setPage(1);
            }}
            options={[
              { value: '', label: 'All ratings' },
              { value: '5', label: '5 stars' },
              { value: '4', label: '4 stars' },
              { value: '3', label: '3 stars' },
            ]}
          />
        </div>

        <div className="w-full sm:w-44">
          <label className="mb-1 block text-xs font-medium text-slate-500">Sort by</label>
          <Select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            options={[
              { value: 'created_desc', label: 'Newest' },
              { value: 'price_asc', label: 'Price: low to high' },
              { value: 'price_desc', label: 'Price: high to low' },
              { value: 'star_desc', label: 'Highest rated' },
              { value: 'name_asc', label: 'Name A-Z' },
            ]}
          />
        </div>

        {(city || starRating) && (
          <Button
            variant="ghost"
            size="sm"
            icon="close"
            onClick={() => {
              setCity('');
              setStarRating('');
              setPage(1);
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Results */}
      <div className="mt-8">
        {loading && <Loading text="Searching hotels..." />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (!data?.items?.length ? (
          <EmptyState
            icon="building"
            title="No hotels match your filters"
            description="Try clearing filters or searching a different city."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setCity('');
                  setStarRating('');
                }}
              >
                Clear filters
              </Button>
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

