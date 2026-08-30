export default function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-[3px]',
  };
  return (
    <div
      className={`inline-block animate-spin rounded-full border-brand-600 border-t-transparent
        ${sizes[size] || sizes.md} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
