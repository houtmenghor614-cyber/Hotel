import Icon from './Icon.jsx';

export default function EmptyState({
  icon = 'helpCircle',
  title = 'Nothing here yet',
  description,
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon name={icon} className="w-7 h-7" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-700">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
