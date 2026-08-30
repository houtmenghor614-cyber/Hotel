import Icon from './Icon.jsx';

export default function Pagination({ page, pages, total, onChange }) {
  if (!total || pages <= 1) return null;

  const go = (next) => {
    if (next >= 1 && next <= pages) onChange?.(next);
  };

  const items = [];
  for (let p = 1; p <= pages; p += 1) {
    if (pages > 7 && p > 2 && p < pages - 1 && Math.abs(p - page) > 1) {
      if (items[items.length - 1] !== '...') items.push('...');
      continue;
    }
    items.push(p);
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40"
        aria-label="Previous page"
      >
        <Icon name="chevron-left" className="w-4 h-4" />
      </button>

      {items.map((item, index) =>
        item === '...' ? (
          <span key={`dot-${index}`} className="px-1 text-slate-400">
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => go(item)}
            className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition
              ${
                item === page
                  ? 'bg-brand-600 text-white'
                  : 'border border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
              }`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page >= pages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40"
        aria-label="Next page"
      >
        <Icon name="chevron-right" className="w-4 h-4" />
      </button>
    </div>
  );
}
