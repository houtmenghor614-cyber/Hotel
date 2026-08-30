import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button.jsx';
import Icon from '../../components/common/Icon.jsx';
import Input from '../../components/common/Input.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useSiteSettings } from '../../hooks/useSiteSettings.js';
import { validate, required, isEmail, minLength, maxLength } from '../../utils/validators.js';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, login } = useAuth();
  const site = useSiteSettings();
  const logo = site.logo || '/assets/logo/logo.png';
  const siteName = site.site_name || 'HotelBooking';

  const [form, setForm] = useState({
    username: '',
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form, {
      username: [required, minLength(3), maxLength(50)],
      full_name: [required],
      email: [required, isEmail],
      password: [required, minLength(6)],
      confirm: [required],
    });
    if (form.password !== form.confirm) {
      errs.confirm = 'Passwords do not match';
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setServerError(null);
    try {
      await register({
        username: form.username,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone || null,
        password: form.password,
      });
      await login({ username: form.username, password: form.password });
      navigate(redirect, { replace: true });
    } catch (err) {
      setServerError(err?.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 py-14">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <img
            src={logo}
            alt={siteName}
            className="mx-auto h-14 w-14 rounded-xl object-cover"
            onError={(e) => {
              e.currentTarget.src = '/assets/logo/logo.png';
            }}
          />
          <h1 className="mt-3 text-2xl font-bold text-slate-800">Create an account</h1>
          <p className="mt-1 text-sm text-slate-500">
            Join {siteName} to book faster and manage your stays
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Full name *"
            placeholder="Your full name"
            value={form.full_name}
            onChange={(e) => setField('full_name', e.target.value)}
            error={errors.full_name}
          />
          <Input
            label="Username *"
            placeholder="Choose a username"
            value={form.username}
            onChange={(e) => setField('username', e.target.value)}
            error={errors.username}
            icon={<Icon name="user" className="w-4 h-4" />}
          />
          <Input
            label="Email *"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            error={errors.email}
            icon={<Icon name="mail" className="w-4 h-4" />}
          />
          <Input
            label="Phone"
            placeholder="+84 900 000 000"
            value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
            error={errors.phone}
            icon={<Icon name="phone" className="w-4 h-4" />}
          />
          <Input
            label="Password *"
            type="password"
            placeholder="At least 6 characters"
            value={form.password}
            onChange={(e) => setField('password', e.target.value)}
            error={errors.password}
            icon={<Icon name="lock" className="w-4 h-4" />}
          />
          <Input
            label="Confirm password *"
            type="password"
            placeholder="Repeat your password"
            value={form.confirm}
            onChange={(e) => setField('confirm', e.target.value)}
            error={errors.confirm}
            icon={<Icon name="lock" className="w-4 h-4" />}
          />

          {serverError && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <Icon name="alert" className="w-4 h-4" /> {serverError}
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" loading={loading} icon="user">
            Create account
          </Button>
        </form>
      </div>

      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link
          to={`/login?redirect=${encodeURIComponent(redirect)}`}
          className="font-medium text-brand-600 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
