import calculateNights from './calculateNights.js';

/**
 * Mirror of the backend pricing logic:
 *   subtotal = price_per_night * nights
 *   discount = coupon discount (percent or fixed, capped by max_discount)
 *   tax      = (subtotal - discount) * TAX_RATE
 *   total    = subtotal - discount + tax
 */
const TAX_RATE = 0.1;

export function calculateTotal({
  pricePerNight = 0,
  checkIn,
  checkOut,
  coupon = null,
} = {}) {
  const nights = calculateNights(checkIn, checkOut);
  const subtotal = Math.round(pricePerNight * nights * 100) / 100;

  let discount = 0;
  if (coupon) {
    if (coupon.discount_type === 'percent') {
      discount = (subtotal * coupon.discount_value) / 100;
      if (coupon.max_discount) discount = Math.min(discount, coupon.max_discount);
    } else {
      discount = Math.min(coupon.discount_value, subtotal);
    }
    discount = Math.round(discount * 100) / 100;
  }

  const tax = Math.round((subtotal - discount) * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal - discount + tax) * 100) / 100;
  return { nights, subtotal, discount, tax, total };
}

export default calculateTotal;
