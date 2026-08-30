/** Format a date string (YYYY-MM-DD or ISO) into a friendly display. */
export function formatDate(value, options = {}) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const defaults = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', { ...defaults, ...options });
}

/** Format a date for <input type="date"> value (YYYY-MM-DD). */
export function toInputDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default formatDate;
