import { useState } from 'react';

import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import Icon from '../common/Icon.jsx';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setDone(true);
  };

  return (
    <section className="bg-brand-700">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center md:flex-row md:text-left">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">
            Get the best deals in your inbox
          </h2>
          <p className="mt-1 text-sm text-brand-100">
            Subscribe for exclusive discounts and early access to promotions.
          </p>
        </div>
        <div className="w-full max-w-md">
          {done ? (
            <div className="flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-3 text-white">
              <Icon name="checkCircle" className="w-5 h-5" />
              Thanks for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                inputClassName="!border-transparent"
              />
              <Button type="submit" className="!bg-white !text-brand-700 hover:!bg-brand-50">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
