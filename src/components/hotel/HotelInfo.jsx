import Icon from '../common/Icon.jsx';

export default function HotelInfo({ hotel }) {
  const details = [
    { icon: 'map-pin', label: 'Address', value: [hotel.address, hotel.city, hotel.state, hotel.country].filter(Boolean).join(', ') },
    { icon: 'phone', label: 'Phone', value: hotel.phone },
    { icon: 'mail', label: 'Email', value: hotel.email },
    { icon: 'home', label: 'Website', value: hotel.website },
    { icon: 'clock', label: 'Check-in', value: hotel.check_in_time },
    { icon: 'clock', label: 'Check-out', value: hotel.check_out_time },
  ].filter((item) => item.value);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800">About this hotel</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {hotel.description || 'No description available yet.'}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {details.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Icon name={item.icon} className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs text-slate-500">{item.label}</div>
              <div className="text-sm font-medium text-slate-700 break-words">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
