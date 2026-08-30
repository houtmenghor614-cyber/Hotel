import Icon from './Icon.jsx';

export default function ErrorMessage({ message = 'Something went wrong', retry = null }) {
  if (!message) return null;
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-3">
      <Icon name="alert" className="w-5 h-5 mt-0.5 shrink-0" />
      <div className="flex-1">
        <p>{message}</p>
        {retry && (
          <button
            type="button"
            onClick={retry}
            className="mt-2 text-red-800 font-medium underline underline-offset-2"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
