import Icon from '../common/Icon.jsx';

export default function HotelLocation({ hotel }) {
  const address = [hotel.address, hotel.city, hotel.state, hotel.zip_code, hotel.country]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800">Location</h2>
      <div className="mt-4 flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <Icon name="map-pin" className="w-4 h-4" />
        </span>
        <p className="text-sm text-slate-600">{address}</p>
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:underline"
      >
        <Icon name="map-pin" className="w-4 h-4" />
        View on Google Maps
      </a>
    </div>
  );
}
