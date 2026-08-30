import Icon from './Icon.jsx';

const VARIANTS = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500',
  secondary:
    'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  ghost:
    'bg-transparent text-brand-700 hover:bg-brand-50 focus:ring-brand-500',
  outline:
    'bg-white text-brand-700 border border-brand-600 hover:bg-brand-50 focus:ring-brand-500',
  link: 'bg-transparent text-brand-600 hover:text-brand-800 underline-offset-2 hover:underline',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon = null,
  iconLeft = null,
  className = '',
  children,
  disabled,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition
        focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed
        ${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || SIZES.md} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Icon name="refresh" className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {iconLeft && <Icon name={iconLeft} className="w-4 h-4" />}
          {icon && <Icon name={icon} className="w-4 h-4" />}
        </>
      )}
      {children}
    </button>
  );
}
