import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';

/** Number of guests stepper (adults + children combined, up to 6). */
export default function GuestSelector({ value, onChange }) {
  const decrease = () => onChange(Math.max(1, value - 1));
  const increase = () => onChange(Math.min(6, value + 1));

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">Guests</label>
      <div className="inline-flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-2 py-1.5">
        <button
          type="button"
          onClick={decrease}
          disabled={value <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40"
          aria-label="Decrease guests"
        >
          <Icon name="minus" className="w-4 h-4" />
        </button>
        <span className="flex items-center gap-2 min-w-24 justify-center text-sm font-medium text-slate-800">
          <Icon name="users" className="w-4 h-4 text-brand-600" />
          {value} {value === 1 ? 'Guest' : 'Guests'}
        </span>
        <button
          type="button"
          onClick={increase}
          disabled={value >= 6}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40"
          aria-label="Increase guests"
        >
          <Icon name="plus" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
