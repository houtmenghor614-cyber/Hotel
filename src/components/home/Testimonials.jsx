import Icon from '../common/Icon.jsx';
import Stars from '../common/Stars.jsx';

const TESTIMONIALS = [
  {
    name: 'Minh Anh',
    role: 'Business traveler',
    rating: 5,
    text: 'Booking was incredibly fast and the hotel exceeded my expectations. Highly recommended!',
  },
  {
    name: 'John Carter',
    role: 'Tourist from the US',
    rating: 4.5,
    text: 'Great selection of hotels and the search filter saved me so much time. Will use again.',
  },
  {
    name: 'Linh Tran',
    role: 'Family vacation',
    rating: 5,
    text: 'The family suite was perfect and booking the kids-friendly room type was a breeze.',
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">What Our Guests Say</h2>
        <p className="mt-1 text-sm text-slate-500">Real feedback from real travelers</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <Icon name="quote" className="h-8 w-8 text-brand-200" />
            <blockquote className="mt-3 text-sm leading-relaxed text-slate-600">
              "{testimonial.text}"
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {testimonial.name.charAt(0)}
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-800">{testimonial.name}</div>
                <div className="text-xs text-slate-500">{testimonial.role}</div>
              </div>
              <div className="ml-auto">
                <Stars rating={testimonial.rating} className="w-3.5 h-3.5" />
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
