import { useState } from 'react';

import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';
import Input from '../common/Input.jsx';
import RatingStars from './RatingStars.jsx';
import reviewApi from '../../api/reviewApi.js';
import { validate, required, minLength } from '../../utils/validators.js';

export default function ReviewForm({ hotel, bookingId, onSuccess }) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(
      { comment },
      { comment: [required, minLength(3)] }
    );
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setServerError(null);
    try {
      await reviewApi.createReview({
        hotel_id: hotel.id,
        booking_id: bookingId || null,
        rating,
        title: title || null,
        comment,
      });
      setRating(5);
      setTitle('');
      setComment('');
      onSuccess?.();
    } catch (err) {
      setServerError(
        err?.response?.data?.detail || 'Could not submit your review. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <span className="mb-1 block text-sm font-medium text-slate-700">Your rating</span>
        <RatingStars value={rating} onChange={setRating} />
      </div>

      <Input
        label="Title (optional)"
        placeholder="A short headline for your review"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={255}
      />

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Your review *
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Tell others about your stay..."
          className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
            errors.comment
              ? 'border-red-400 focus:ring-red-200'
              : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'
          }`}
        />
        {errors.comment && <p className="mt-1 text-xs text-red-600">{errors.comment}</p>}
      </div>

      {serverError && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <Icon name="alert" className="w-4 h-4" />
          {serverError}
        </div>
      )}

      <Button type="submit" loading={loading} icon="send">
        Submit review
      </Button>
    </form>
  );
}
