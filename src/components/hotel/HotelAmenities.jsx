import Icon from '../common/Icon.jsx';

const ICON_MAP = {
  'Free Wi-Fi': 'wifi',
  'Swimming Pool': 'pool',
  'Restaurant': 'restaurant',
  'Free Parking': 'parking',
  'Room Service': 'bed',
  '24/7 Front Desk': 'clock',
  'Airport Shuttle': 'plane',
  'Gym': 'gym',
  'Spa': 'spa',
  'Laundry Service': 'refresh',
  'Conference Room': 'users',
  'Bar': 'coffee',
};

export default function HotelAmenities({ amenities = [] }) {
  if (amenities.length === 0) {
    return (
      <p className="text-sm text-slate-500">No amenities listed yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {amenities.map((name, index) => (
        <div key={`${name}-${index}`} className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Icon name={ICON_MAP[name] || 'check'} className="w-4 h-4" />
          </span>
          <span className="text-sm text-slate-700">{name}</span>
        </div>
      ))}
    </div>
  );
}
