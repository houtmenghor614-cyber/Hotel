import { useId } from 'react';

export default function Input({
  label,
  error,
  icon,
  className = '',
  inputClassName = '',
  ...props
}) {
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
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800
            placeholder:text-slate-400 focus:outline-none focus:ring-2
            ${icon ? 'pl-10' : ''}
            ${error
              ? 'border-red-400 focus:ring-red-200'
              : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'}
            ${inputClassName}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
