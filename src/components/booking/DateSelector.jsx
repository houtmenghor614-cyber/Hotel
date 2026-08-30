import { useId } from 'react';

import Icon from '../common/Icon.jsx';
import { toInputDate } from '../../utils/formatDate.js';

/** Check-in / check-out date inputs. */
export default function DateSelector({ checkIn, checkOut, onCheckIn, onCheckOut }) {
  const id = useId();
  const today = toInputDate(new Date());

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">Dates</label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="mb-1 flex items-center gap-1 text-xs text-slate-500">
            <Icon name="calendar" className="w-3.5 h-3.5" /> Check-in
          </span>
          <input
            id={`${id}-in`}
            type="date"
            value={checkIn || ''}
            min={today}
            onChange={(e) => {
              onCheckIn(e.target.value);
              if (checkOut && e.target.value >= checkOut) onCheckOut('');
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <span className="mb-1 flex items-center gap-1 text-xs text-slate-500">
            <Icon name="calendar" className="w-3.5 h-3.5" /> Check-out
          </span>
          <input
            id={`${id}-out`}
            type="date"
            value={checkOut || ''}
            min={checkIn || today}
            onChange={(e) => onCheckOut(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>
    </div>
  );
}
