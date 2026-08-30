import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';
import { useBooking } from '../../hooks/useBooking.js';
import { toInputDate } from '../../utils/formatDate.js';
import { calculateNights } from '../../utils/calculateNights.js';

export default function SearchBox() {
  const { search, updateSearch } = useBooking();
  const navigate = useNavigate();

  const [local, setLocal] = useState({
    city: search.city || '',
    checkIn: search.checkIn || toInputDate(new Date(Date.now() + 24 * 3600 * 1000)),
    checkOut: search.checkOut || '',
    guests: search.guests || 2,
  });

  const setField = (field, value) => setLocal((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSearch(local);
    const params = new URLSearchParams();
    if (local.city) params.set('city', local.city);
    if (local.checkIn) params.set('checkIn', local.checkIn);
    if (local.checkOut) params.set('checkOut', local.checkOut);
    params.set('guests', local.guests);
    navigate(`/search?${params.toString()}`);
  };

  const nights = calculateNights(local.checkIn, local.checkOut);

  const fieldClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100';

  return (
    <div id="search-box" className="mx-auto -mt-10 max-w-5xl px-4 relative z-10">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60"
      >
        <div className="grid gap-3 md:grid-cols-5">
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Icon name="map-pin" className="w-3.5 h-3.5" /> City / Hotel
            </label>
            <input
              type="text"
              value={local.city}
              onChange={(e) => setField('city', e.target.value)}
              placeholder="Ho Chi Minh City..."
              className={fieldClass}
            />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Icon name="calendar" className="w-3.5 h-3.5" /> Check-in
            </label>
            <input
              type="date"
              value={local.checkIn}
              min={toInputDate(new Date())}
              onChange={(e) => setField('checkIn', e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Icon name="calendar" className="w-3.5 h-3.5" /> Check-out
            </label>
            <input
              type="date"
              value={local.checkOut}
              min={local.checkIn || toInputDate(new Date())}
              onChange={(e) => setField('checkOut', e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Icon name="users" className="w-3.5 h-3.5" /> Guests
            </label>
            <select
              value={local.guests}
              onChange={(e) => setField('guests', Number(e.target.value))}
              className={fieldClass}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button type="submit" className="w-full" size="lg" icon="search">
              Search
            </Button>
          </div>
        </div>
        {nights > 0 && (
          <p className="mt-3 text-center text-xs text-slate-500">
            Your stay: <span className="font-semibold text-brand-700">{nights} night{nights > 1 ? 's' : ''}</span>
          </p>
        )}
      </form>
    </div>
  );
}
