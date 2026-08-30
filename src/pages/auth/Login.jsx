import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button.jsx';
import Icon from '../../components/common/Icon.jsx';
import Input from '../../components/common/Input.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useSiteSettings } from '../../hooks/useSiteSettings.js';
import { validate, required } from '../../utils/validators.js';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const site = useSiteSettings();
  const logo = site.logo || '/assets/logo/logo.png';
  const siteName = site.site_name || 'HotelBooking';

  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(
      form,
      {
        username: [required],
        password: [required],
      }
    );
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setServerError(null);
    try {
      await login(form);
      navigate(redirect, { replace: true });
    } catch (err) {
      setServerError(err?.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

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
          <h1 className="mt-3 text-2xl font-bold text-slate-800">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to {siteName}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Username or email"
            placeholder="guest or user@hotel.com"
            value={form.username}
            onChange={(e) => setField('username', e.target.value)}
            error={errors.username}
            icon={<Icon name="user" className="w-4 h-4" />}
          />
          <div>
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setField('password', e.target.value)}
              error={errors.password}
              icon={<Icon name="lock" className="w-4 h-4" />}
            />
            <button
              type="button"
              onClick={() => setShowPassword((show) => !show)}
              className="mt-1 text-xs text-brand-600 hover:underline"
            >
              {showPassword ? 'Hide password' : 'Show password'}
            </button>
          </div>

          {serverError && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <Icon name="alert" className="w-4 h-4" /> {serverError}
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" loading={loading} icon="logout">
            Sign in
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link to="/forgot-password" className="text-brand-600 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>

      <p className="mt-5 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link
          to={`/register?redirect=${encodeURIComponent(redirect)}`}
          className="font-medium text-brand-600 hover:underline"
        >
          Register here
        </Link>
      </p>
    </div>
  );
}
