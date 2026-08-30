import { useState } from 'react';

import Button from '../../components/common/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import Icon from '../../components/common/Icon.jsx';
import Input from '../../components/common/Input.jsx';
import ProfileCard from '../../components/account/ProfileCard.jsx';
import userApi from '../../api/userApi.js';
import { useAuth } from '../../hooks/useAuth.js';
import { validate, required, isEmail } from '../../utils/validators.js';

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({
    full_name: user?.full_name || '',
    phone: user?.phone || '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form, {
      full_name: [required],
      phone: [],
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setMessage(null);
    try {
      const { data } = await userApi.updateProfile(form);
      updateUser(data);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err?.response?.data?.detail || 'Could not update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProfileCard />

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
          <Icon name="edit" className="w-5 h-5 text-brand-600" /> Edit profile
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input
            label="Full name *"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            error={errors.full_name}
          />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+84 900 000 000"
          />
          <Input label="Email" value={user?.email || ''} disabled className="sm:col-span-2" />

          {message && (
            <div
              className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm sm:col-span-2 ${
                message.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              <Icon
                name={message.type === 'success' ? 'checkCircle' : 'alert'}
                className="w-4 h-4"
              />
              {message.text}
            </div>
          )}

          <div className="sm:col-span-2">
            <Button type="submit" loading={loading} icon="check">
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
