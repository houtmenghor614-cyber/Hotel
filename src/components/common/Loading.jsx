import Spinner from './Spinner.jsx';

export default function Loading({ text = 'Loading...', full = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 text-slate-500
        ${full ? 'min-h-[50vh]' : 'py-12'}`}
    >
      <Spinner size="lg" />
      <span className="text-sm">{text}</span>
    </div>
  );
}
