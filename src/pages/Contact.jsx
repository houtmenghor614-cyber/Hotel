import { useState } from 'react';

import Button from '../components/common/Button.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import Icon from '../components/common/Icon.jsx';
import Input from '../components/common/Input.jsx';
import { useSiteSettings } from '../hooks/useSiteSettings.js';
import { validate, required, isEmail, minLength } from '../utils/validators.js';
import api from '../api/axios.js';

export default function Contact() {
  const site = useSiteSettings();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form, {
      name: [required],
      email: [required, isEmail],
      subject: [required],
      message: [required, minLength(3)],
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setServerError(null);
    try {
      await api.post('/contacts', form);
      setSent(true);
    } catch (err) {
      setServerError(err?.response?.data?.detail || 'Could not send your message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img
          src="/assets/backgrounds/contact.jpg"
          alt="Contact us"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-slate-200">We are here to help, 24/7</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-5">
            {[
              { icon: 'map-pin', title: 'Head office', lines: [(site.contact_address || '12 Nguyen Hue, District 1, Ho Chi Minh City, Vietnam').split(',').map((s) => s.trim())].flat() },
              { icon: 'phone', title: 'Phone', lines: [site.contact_phone || '+84 28 3822 1234'] },
              { icon: 'mail', title: 'Email', lines: [site.contact_email || 'support@hotelbooking.vn'] },
              { icon: 'clock', title: 'Working hours', lines: ['Customer support: 24/7', 'Office: Mon–Sat, 8:00–18:00'] },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={item.icon} className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-800">{item.title}</h3>
                  {item.lines.map((line) => (
                    <p key={line} className="text-sm text-slate-500">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            {sent ? (
              <div className="py-10 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Icon name="checkCircle" className="w-8 h-8" />
                </span>
                <h2 className="mt-4 text-xl font-bold text-slate-800">Message sent!</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Thank you for reaching out. We will get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-slate-800">Send us a message</h2>
                <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Your name *"
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    error={errors.name}
                  />
                  <Input
                    label="Email *"
                    type="email"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    error={errors.email}
                  />
                  <Input
                    label="Phone"
                    value={form.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                  />
                  <Input
                    label="Subject *"
                    value={form.subject}
                    onChange={(e) => setField('subject', e.target.value)}
                    error={errors.subject}
                  />
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setField('message', e.target.value)}
                      placeholder="How can we help?"
                      className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                        errors.message
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {serverError && <ErrorMessage message={serverError} />}

                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" loading={loading} icon="send">
                      Send message
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

