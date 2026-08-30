import { Link } from 'react-router-dom';

import Icon from '../components/common/Icon.jsx';

const SECTIONS = [
  {
    title: '1. Acceptance of terms',
    text: 'By accessing or using HotelBooking, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.',
  },
  {
    title: '2. Bookings and payments',
    text: 'All bookings are subject to hotel availability and confirmation. Prices shown include applicable taxes unless stated otherwise. Unpaid bookings must be settled on-site at check-in.',
  },
  {
    title: '3. Cancellations',
    text: 'Cancellation policies vary by hotel and room type. You can cancel eligible bookings from your account page before the hotel cancellation deadline.',
  },
  {
    title: '4. User accounts',
    text: 'You are responsible for keeping your login credentials secure and for all activity that happens under your account. Please notify us immediately of any unauthorized use.',
  },
  {
    title: '5. Reviews',
    text: 'Reviews must be honest, respectful and based on a real stay. We reserve the right to remove reviews that violate these guidelines.',
  },
  {
    title: '6. Limitation of liability',
    text: 'HotelBooking acts as a booking platform. We are not liable for services provided by third-party hotels beyond the facilitation of the booking.',
  },
];

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-800">
        <Icon name="book" className="w-8 h-8 text-brand-600" /> Terms of Service
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
