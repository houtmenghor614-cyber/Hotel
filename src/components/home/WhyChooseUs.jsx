import Icon from '../common/Icon.jsx';

const FEATURES = [
  {
    icon: 'wallet',
    title: 'Best Price Guarantee',
    text: 'Find a lower price elsewhere and we will match it.',
  },
  {
    icon: 'shield',
    title: 'Secure Booking',
    text: 'Your information is encrypted and always protected.',
  },
  {
    icon: 'clock',
    title: '24/7 Support',
    text: 'Our friendly support team is here around the clock.',
  },
  {
    icon: 'refresh',
    title: 'Free Cancellation',
    text: 'Plans change — cancel free on most bookings.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Why Choose Us</h2>
        <p className="mt-1 text-sm text-slate-500">
          Everything you need for a stress-free stay
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Icon name={feature.icon} className="w-6 h-6" />
            </div>
            <h3 className="mt-4 font-semibold text-slate-800">{feature.title}</h3>
            <p className="mt-1.5 text-sm text-slate-500">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
