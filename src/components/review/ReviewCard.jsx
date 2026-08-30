import Icon from '../common/Icon.jsx';
import Stars from '../common/Stars.jsx';
import { formatDate } from '../../utils/formatDate.js';
import { uploadUrl } from '../../utils/uploads.js';

export default function ReviewCard({ review }) {
  const author = review.user;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {author?.avatar ? (
            <img
              src={uploadUrl(author.avatar)}
              alt={author.full_name}
              className="h-10 w-10 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
              {(author?.full_name || 'U').charAt(0)}
            </span>
          )}
          <div>
            <div className="text-sm font-semibold text-slate-800">
              {author?.full_name || 'Anonymous'}
            </div>
            <div className="text-xs text-slate-500">{formatDate(review.created_at)}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Stars rating={review.rating} />
          <span className="text-sm font-semibold text-slate-700">{review.rating}.0</span>
        </div>
      </div>

      {review.title && (
        <h4 className="mt-3 font-semibold text-slate-800">{review.title}</h4>
      )}
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{review.comment}</p>

      {review.reply && (
        <div className="mt-4 rounded-lg bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Icon name="send" className="w-3.5 h-3.5 text-brand-600" />
            Response from the hotel
          </div>
          <p className="mt-1 text-sm text-slate-600">{review.reply}</p>
        </div>
      )}
    </article>
  );
}
