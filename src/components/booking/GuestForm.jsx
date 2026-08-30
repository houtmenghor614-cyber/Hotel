import { useEffect } from 'react';

import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import Icon from '../common/Icon.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { validate, required, isEmail, isPhone } from '../../utils/validators.js';

/** Collects the lead guest (contact info) and additional guests. */
export default function GuestForm({ guests, onChange, onAdd, onRemove }) {
  const { user } = useAuth();

  const lead = guests[0] || { full_name: '', email: '', phone: '', is_primary: true };
  const extras = guests.slice(1);

  const setLead = (field, value) => {
    onChange([{ ...lead, [field]: value, is_primary: true }, ...extras]);
  };

  // Pre-fill lead guest from the logged-in user on first render
  useEffect(() => {
    if (user && guests.length === 0) {
      onChange([
        {
          full_name: user.full_name || '',
          email: user.email || '',
          phone: user.phone || '',
          is_primary: true,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rules = {
    full_name: [required],
    email: [required, isEmail],
    phone: [isPhone],
  };

  const leadErrors = validate(lead, rules);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
        <Icon name="users" className="w-5 h-5 text-brand-600" /> Guest details
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Input
          label="Full name *"
          placeholder="Lead guest name"
          value={lead.full_name || ''}
          onChange={(e) => setLead('full_name', e.target.value)}
          error={leadErrors.full_name}
        />
        <Input
          label="Email *"
          type="email"
          placeholder="you@example.com"
          value={lead.email || ''}
          onChange={(e) => setLead('email', e.target.value)}
          error={leadErrors.email}
        />
        <Input
          label="Phone"
          placeholder="+84 900 000 000"
          value={lead.phone || ''}
          onChange={(e) => setLead('phone', e.target.value)}
          error={leadErrors.phone}
        />
      </div>

      {extras.map((guest, index) => (
        <div key={index} className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Guest {index + 2}
            </span>
            <button
              type="button"
              onClick={() => onRemove(index + 1)}
              className="flex items-center gap-1 text-xs text-red-500 hover:underline"
            >
              <Icon name="trash" className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Input
              placeholder="Full name"
              value={guest.full_name || ''}
              onChange={(e) => {
                const next = [...extras];
                next[index] = { ...guest, full_name: e.target.value };
                onChange([lead, ...next]);
              }}
            />
            <Input
              placeholder="Phone"
              value={guest.phone || ''}
              onChange={(e) => {
                const next = [...extras];
                next[index] = { ...guest, phone: e.target.value };
                onChange([lead, ...next]);
              }}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-4"
        icon="plus"
        onClick={() => onAdd({ full_name: '', email: '', phone: '' })}
      >
        Add another guest
      </Button>
    </div>
  );
}
