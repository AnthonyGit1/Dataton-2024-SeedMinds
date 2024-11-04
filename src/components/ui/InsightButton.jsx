import { LightbulbIcon } from 'lucide-react';

const InsightButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full hover:bg-purple-50 text-purple-600 transition-colors"
    title="Ver insights"
  >
    <LightbulbIcon className="h-5 w-5" />
  </button>
);

export { InsightModal, InsightButton };