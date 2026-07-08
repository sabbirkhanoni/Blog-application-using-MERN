import { useEffect, useState } from 'react';
import type { Blog } from '../utils/types';
import { getPendingBlogs, approveBlog, rejectBlog } from '../features/blog/blog.service';
import BlogCard from '../features/blog/BlogCard';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function loadPendingBlogs() {
    setIsLoading(true);
    getPendingBlogs()
      .then(setBlogs)
      .catch(() => setError('Failed to load pending blogs'))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadPendingBlogs();
  }, []);

  async function handleApprove(id: number) {
    try {
      await approveBlog(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch {
      alert('Failed to approve blog');
    }
  }

  async function handleReject(id: number) {
    try {
      await rejectBlog(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch {
      alert('Failed to reject blog');
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pending Blogs</h1>

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!isLoading && !error && blogs.length === 0 && (
        <p className="text-gray-500">No pending blogs to review.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} showStatus showAuthor>
            <button
              onClick={() => handleApprove(blog.id)}
              className="text-sm bg-green-50 text-green-700 rounded px-3 py-1.5 hover:bg-green-100"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(blog.id)}
              className="text-sm bg-red-50 text-red-700 rounded px-3 py-1.5 hover:bg-red-100"
            >
              Reject
            </button>
          </BlogCard>
        ))}
      </div>
    </div>
  );
}
