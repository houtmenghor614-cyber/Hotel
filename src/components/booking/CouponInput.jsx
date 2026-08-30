import { useState } from 'react';

import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import Icon from '../common/Icon.jsx';
import couponApi from '../../api/couponApi.js';

/** Applies a coupon code (validated against the backend). */
export default function CouponInput({ subtotal, coupon, onApply }) {
  const [code, setCode] = useState(coupon?.code || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setMessage(null);
    try {
      const { data } = await couponApi.validate(code.trim(), subtotal);
      if (data.valid) {
        onApply({ ...data, code: data.code || code.trim() });
        setMessage({ type: 'success', text: data.message });
      } else {
        onApply(null);
        setMessage({ type: 'error', text: data.message });
      }
    } catch (err) {
      onApply(null);
      setMessage({ type: 'error', text: err?.response?.data?.detail || 'Could not validate coupon' });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    onApply(null);
    setCode('');
    setMessage(null);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
        <Icon name="tag" className="w-4 h-4 text-brand-600" /> Coupon
      </h3>

      {coupon ? (
        <div className="mt-3 flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-medium text-emerald-700">
            <Icon name="checkCircle" className="w-4 h-4" />
            {coupon.code} · -{new Intl.NumberFormat('vi-VN').format(coupon.discount_amount)}đ
          </span>
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs text-emerald-700 underline"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="Enter coupon code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="flex-1"
          />
          <Button type="button" variant="outline" onClick={handleApply} loading={loading}>
            Apply
          </Button>
        </div>
      )}

      {message && (
        <p
          className={`mt-2 text-xs ${
            message.type === 'success' ? 'text-emerald-600' : 'text-red-600'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
