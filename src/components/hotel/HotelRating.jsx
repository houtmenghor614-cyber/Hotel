import Stars from '../common/Stars.jsx';

export default function HotelRating({ hotel }) {
  const rating = hotel.avg_rating;
  const count = hotel.review_count || 0;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {rating ? (
        <span className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3 py-1.5 text-white">
          <Stars rating={rating} className="w-4 h-4" colorClass="text-amber-300" />
          <span className="text-sm font-bold">{rating.toFixed(1)}</span>
        </span>
      ) : (
        <span className="rounded-lg bg-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600">
          New
        </span>
      )}
      <span className="text-sm text-slate-500">
        {count > 0 ? `${count} review${count > 1 ? 's' : ''}` : 'No reviews yet'}
      </span>
      {hotel.star_rating > 0 && (
        <span className="text-sm font-medium text-slate-600">
          · {'★'.repeat(hotel.star_rating)} hotel
        </span>
      )}
    </div>
  );
}
