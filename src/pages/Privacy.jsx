import { Link } from 'react-router-dom';

import Icon from '../components/common/Icon.jsx';

const SECTIONS = [
  {
    title: 'Information we collect',
    text: 'We collect information you provide directly — such as your name, email, phone number and booking details — as well as technical data like browser type and device information.',
  },
  {
    title: 'How we use your information',
    text: 'Your information is used to process bookings, personalize your experience, provide customer support, and send booking-related notifications.',
  },
  {
    title: 'Data protection',
    text: 'We use industry-standard security measures including encryption to protect your personal data. Passwords are stored hashed and never in plain text.',
  },
  {
    title: 'Sharing of information',
    text: 'We share necessary details with partner hotels only to complete your booking. We never sell your personal information to third parties.',
  },
  {
    title: 'Cookies',
    text: 'We use cookies to keep you signed in and to remember your preferences. You can disable cookies in your browser settings, though some features may not work.',
  },
  {
    title: 'Your rights',
    text: 'You may request access to, correction of, or deletion of your personal data at any time by contacting our support team.',
  },
];

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-800">
        <Icon name="shield" className="w-8 h-8 text-brand-600" /> Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>

      <div className="mt-8 space-y-6">
        {SECTIONS.map((section) => (
          <section key={section.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-800">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.text}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-sm font-medium text-brand-600 hover:underline">
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
