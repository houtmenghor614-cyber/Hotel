import Icon from '../common/Icon.jsx';

/** Interactive star picker (1-5). */
export default function RatingStars({ value = 0, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= value;
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            className="p-0.5"
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
          >
            <Icon
              name="star"
              className="w-6 h-6 text-amber-400 transition hover:scale-110"
              fill={active ? 'currentColor' : 'none'}
              strokeWidth={active ? 0 : 2}
            />
          </button>
        );
      })}
    </div>
  );
}
