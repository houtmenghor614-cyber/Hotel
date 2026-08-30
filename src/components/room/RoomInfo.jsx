import Icon from '../common/Icon.jsx';

export default function RoomInfo({ room }) {
  const items = [
    { icon: 'bed', label: 'Bed type', value: room.bed_type || 'Standard' },
    { icon: 'users', label: 'Max guests', value: `${room.max_guests} guests` },
    { icon: 'building', label: 'Size', value: room.size_sqft ? `${room.size_sqft} m²` : '—' },
    { icon: 'home', label: 'Hotel', value: room.hotel_name || '—' },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800">Room details</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Icon name={item.icon} className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs text-slate-500">{item.label}</div>
              <div className="text-sm font-medium text-slate-700">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
      {room.description && (
        <p className="mt-5 text-sm leading-relaxed text-slate-600">{room.description}</p>
      )}
    </div>
  );
}
