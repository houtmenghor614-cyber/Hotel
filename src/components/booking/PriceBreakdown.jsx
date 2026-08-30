import { formatPrice } from '../../utils/formatPrice.js';

/** Line-item price breakdown: subtotal, discount, tax and total. */
export default function PriceBreakdown({ subtotal, discount = 0, tax = 0, total }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800">Price breakdown</h3>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Coupon discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-600">
          <span>Tax (10%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="font-semibold text-slate-800">Total</span>
        <span className="text-xl font-bold text-brand-700">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
