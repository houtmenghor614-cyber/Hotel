import { Link } from 'react-router-dom';

import Button from '../components/common/Button.jsx';
import Icon from '../components/common/Icon.jsx';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Icon name="helpCircle" className="w-10 h-10" />
      </span>
      <h1 className="mt-6 text-6xl font-bold text-slate-800">404</h1>
      <p className="mt-3 text-lg font-semibold text-slate-700">Page not found</p>
      <p className="mt-1 text-sm text-slate-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/">
          <Button icon="home">Back to homepage</Button>
        </Link>
        <Link to="/hotels">
          <Button variant="outline" icon="building">
            Browse hotels
          </Button>
        </Link>
      </div>
    </div>
  );
}
