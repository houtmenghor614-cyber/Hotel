import Icon from '../common/Icon.jsx';
import Img from '../common/Img.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { uploadUrl } from '../../utils/uploads.js';
import userApi from '../../api/userApi.js';

export default function ProfileCard({ onUpdated }) {
  const { user, updateUser } = useAuth();

  const handleAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { data } = await userApi.uploadAvatar(file);
      updateUser(data);
      onUpdated?.();
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err?.response?.data?.detail || 'Upload failed');
    } finally {
      e.target.value = '';
    }
  };

  if (!user) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="h-24 bg-gradient-to-r from-brand-600 to-brand-400" />
      <div className="px-6 pb-6">
        <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            {user.avatar ? (
              <img
                src={uploadUrl(user.avatar)}
                alt={user.full_name}
                className="h-20 w-20 rounded-full border-4 border-white object-cover shadow"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <span className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-brand-600 text-2xl font-bold text-white shadow">
                {user.full_name?.charAt(0) || 'U'}
              </span>
            )}
            <div className="pb-1">
              <h2 className="text-lg font-bold text-slate-800">{user.full_name}</h2>
              <p className="text-sm text-slate-500">@{user.username}</p>
            </div>
          </div>

          <label className="cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <span className="flex items-center gap-2">
              <Icon name="edit" className="w-4 h-4" /> Change photo
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
          </label>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { icon: 'mail', label: 'Email', value: user.email },
            { icon: 'phone', label: 'Phone', value: user.phone || '—' },
            { icon: 'shield', label: 'Role', value: user.role === 'admin' ? 'Administrator' : 'Member' },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-slate-50 p-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Icon name={item.icon} className="w-3.5 h-3.5" /> {item.label}
              </div>
              <div className="mt-1 truncate text-sm font-medium text-slate-800">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
