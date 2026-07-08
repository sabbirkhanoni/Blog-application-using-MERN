import type { BlogStatus } from '../utils/types';

const STYLES: Record<BlogStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};

export default function StatusBadge({ status }: { status: BlogStatus }) {
  return (
    <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${STYLES[status]}`}>
      {status}
    </span>
  );
}
