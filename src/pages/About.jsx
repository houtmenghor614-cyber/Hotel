import { Link } from 'react-router-dom';

import Button from '../components/common/Button.jsx';
import Icon from '../components/common/Icon.jsx';

const VALUES = [
  {
    icon: 'home',
    title: 'Comfort First',
    text: 'Rooms designed with your comfort in mind — quality beds, quiet spaces and all the essentials.',
  },
  {
    icon: 'wallet',
    title: 'Honest Pricing',
    text: 'No hidden fees. The price you see is the price you pay, with transparent taxes and discounts.',
  },
  {
    icon: 'shield',
    title: 'Trusted Bookings',
    text: 'Secure payments, verified hotels and a helpful support team whenever you need us.',
  },
];

export default function About() {
  return (
    <div>
      <div className="relative h-72 overflow-hidden">
        <img
          src="/assets/backgrounds/about.jpg"
          alt="About our hotel network"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-bold">About HotelBooking</h1>
          <p className="mt-2 max-w-xl text-slate-200">
            Connecting travelers with great hotels since 2015
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-14">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-slate-800">Our story</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            HotelBooking started with a simple idea: booking a hotel should be as
            easy as a few clicks. Today we work with hundreds of partner hotels to
            bring you verified reviews, real availability and the best nightly rates —
            all in one place.
          </p>
          <p className="mt-3 leading-relaxed text-slate-600">
            Whether you are traveling for business or pleasure, solo or with family,
            our goal is to make every stay a great one.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Icon name={value.icon} className="w-6 h-6" />
              </span>
              <h3 className="mt-4 font-semibold text-slate-800">{value.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{value.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-brand-700 p-10 text-center text-white">
          <h2 className="text-2xl font-bold">Ready for your next trip?</h2>
          <p className="mt-2 text-brand-100">
            Explore our hotels and find the perfect place to stay.
          </p>
          <Link to="/hotels" className="mt-6 inline-block">
            <Button className="!bg-white !text-brand-700 hover:!bg-brand-50" size="lg">
              Browse hotels
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
