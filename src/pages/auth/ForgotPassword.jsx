import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/common/Button.jsx';
import Icon from '../../components/common/Icon.jsx';
import Input from '../../components/common/Input.jsx';

/**
 * Forgot password page.
 * The current backend sends a "password reset instructions" placeholder message —
 * contact the hotel admin to reset your password.
 */
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError(null);
    setSent(true);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 py-14">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Icon name="lock" className="w-7 h-7" />
          </span>
          <h1 className="mt-3 text-2xl font-bold text-slate-800">Forgot password?</h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter your email and we will send reset instructions
          </p>
        </div>

        {sent ? (
          <div className="mt-6 rounded-lg bg-emerald-50 p-5 text-center text-sm text-emerald-700">
            <Icon name="checkCircle" className="mx-auto mb-2 h-8 w-8" />
            <p>
              If an account exists for <strong>{email}</strong>, password reset
              instructions have been sent.
            </p>
            <Link to="/login" className="mt-3 inline-block font-medium text-brand-600 hover:underline">
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              icon={<Icon name="mail" className="w-4 h-4" />}
            />
            <Button type="submit" className="w-full" size="lg" icon="send">
              Send reset instructions
            </Button>
          </form>
        )}
      </div>

      <p className="mt-5 text-center text-sm text-slate-500">
        Remembered it?{' '}
        <Link to="/login" className="font-medium text-brand-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
