import Icon from './Icon.jsx';

/** Renders 1-5 stars for a numeric rating (supports halves via rating rounding). */
export default function Stars({ rating = 0, max = 5, className = 'w-4 h-4', colorClass = 'text-amber-400' }) {
  const value = Math.round(Number(rating || 0) * 2) / 2;
  const full = Math.floor(value);
  const half = value - full >= 0.5;

  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Rating ${rating} out of ${max}`}>
      {Array.from({ length: max }).map((_, index) => {
        const isFull = index < full;
        const isHalf = !isFull && half && index === full;
        return (
          <Icon
            key={index}
            name="star"
            className={`${className} ${colorClass}`}
            fill={isFull ? 'currentColor' : isHalf ? 'currentColor' : 'none'}
            strokeWidth={isFull ? 0 : 2}
          />
        );
      })}
    </span>
  );
}
