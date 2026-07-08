import type { Blog } from '../../utils/types';
import StatusBadge from '../../components/StatusBadge';

interface BlogCardProps {
  blog: Blog;
  showStatus?: boolean;
  showAuthor?: boolean;
  children?: React.ReactNode;
}

export default function BlogCard({ blog, showStatus = false, showAuthor = false, children }: BlogCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
        {showStatus && <StatusBadge status={blog.status} />}
      </div>

      {showAuthor && blog.author_name && (
        <p className="text-xs text-gray-500">
          By {blog.author_name}
          {blog.author_email ? ` (${blog.author_email})` : ''}
        </p>
      )}

      <p className="text-sm text-gray-700 whitespace-pre-line">{blog.content}</p>

      <p className="text-xs text-gray-400">
        {new Date(blog.created_at).toLocaleDateString()}
      </p>

      {children && <div className="flex gap-2 mt-2">{children}</div>}
    </div>
  );
}
