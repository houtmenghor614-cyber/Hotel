/** Lightweight client-side validators. Each returns an error string or null. */

export function required(value) {
  return value && String(value).trim() ? null : 'This field is required';
}

export function isEmail(value) {
  if (!value) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email address';
}

export function isPhone(value) {
  if (!value) return null;
  return /^[+]?[\d\s-]{8,15}$/.test(value) ? null : 'Invalid phone number';
}

export function minLength(min) {
  return (value) =>
    !value || String(value).length >= min
      ? null
      : `Must be at least ${min} characters`;
}

export function maxLength(max) {
  return (value) =>
    !value || String(value).length <= max
      ? null
      : `Must be at most ${max} characters`;
}

export function isNumber({ min, max } = {}) {
  return (value) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    if (Number.isNaN(num)) return 'Must be a number';
    if (min !== undefined && num < min) return `Must be at least ${min}`;
    if (max !== undefined && num > max) return `Must be at most ${max}`;
    return null;
  };
}

/** Validate an object of { field: [rules...] } and return { field: error } map. */
export function validate(values, rules) {
  const errors = {};
  Object.entries(rules).forEach(([field, fieldRules]) => {
    for (const rule of fieldRules) {
      const error = rule(values[field]);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });
  return errors;
}

const validators = {
  required,
  isEmail,
  isPhone,
  minLength,
  maxLength,
  isNumber,
  validate,
};

export default validators;
