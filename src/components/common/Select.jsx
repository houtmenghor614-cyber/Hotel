import { useId } from 'react';

export default function Select({ label, error, options = [], className = '', ...props }) {
  const id = useId();
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800
          focus:outline-none focus:ring-2
          ${error
            ? 'border-red-400 focus:ring-red-200'
            : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
