import { useState } from 'react';

import Button from '../../components/common/Button.jsx';
import Icon from '../../components/common/Icon.jsx';
import Input from '../../components/common/Input.jsx';
import userApi from '../../api/userApi.js';
import { useAuth } from '../../hooks/useAuth.js';
import { validate, required, minLength } from '../../utils/validators.js';

export default function Settings() {
  const { logout } = useAuth();

  const [form, setForm] = useState({
    old_password: '',
    new_password: '',
    confirm: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form, {
      old_password: [required],
      new_password: [required, minLength(6)],
      confirm: [required],
    });
    if (form.new_password !== form.confirm) {
      errs.confirm = 'Passwords do not match';
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setMessage(null);
    try {
      await userApi.changePassword({
        old_password: form.old_password,
        new_password: form.new_password,
      });
      setForm({ old_password: '', new_password: '', confirm: '' });
      setMessage({ type: 'success', text: 'Password changed successfully' });
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.detail || 'Could not change password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
      <p className="text-sm text-slate-500">Manage your account security</p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
          <Icon name="lock" className="w-5 h-5 text-brand-600" /> Change password
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 max-w-md space-y-4">
          <Input
            label="Current password *"
            type="password"
            value={form.old_password}
            onChange={(e) => setField('old_password', e.target.value)}
            error={errors.old_password}
          />
          <Input
            label="New password *"
            type="password"
            placeholder="At least 6 characters"
            value={form.new_password}
            onChange={(e) => setField('new_password', e.target.value)}
            error={errors.new_password}
          />
          <Input
            label="Confirm new password *"
            type="password"
            value={form.confirm}
            onChange={(e) => setField('confirm', e.target.value)}
            error={errors.confirm}
          />

          {message && (
            <div
              className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
                message.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              <Icon name={message.type === 'success' ? 'checkCircle' : 'alert'} className="w-4 h-4" />
              {message.text}
            </div>
          )}

          <Button type="submit" loading={loading} icon="check">
            Update password
          </Button>
        </form>
      </div>

      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-bold text-red-700">Danger zone</h2>
        <p className="mt-1 text-sm text-red-600">
          Sign out of this device. You can sign back in anytime.
        </p>
        <Button variant="danger" className="mt-4" onClick={logout} icon="logout">
          Sign out
        </Button>
      </div>
    </div>
  );
}
