import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Blog } from '../utils/types';
import { getMyBlogs, deleteBlog } from '../features/blog/blog.service';
import BlogCard from '../features/blog/BlogCard';

export default function MyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function loadBlogs() {
    setIsLoading(true);
    getMyBlogs()
      .then(setBlogs)
      .catch(() => setError('Failed to load your blogs'))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  async function handleDelete(id: number) {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch {
      alert('Failed to delete blog');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Blogs</h1>
        <Link
          to="/blogs/create"
          className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700"
        >
          + Create Blog
        </Link>
      </div>

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!isLoading && !error && blogs.length === 0 && (
        <p className="text-gray-500">You haven't created any blogs yet.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} showStatus>
            <Link
              to={`/blogs/${blog.id}/edit`}
              className="text-sm bg-gray-100 text-gray-800 rounded px-3 py-1.5 hover:bg-gray-200"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(blog.id)}
              className="text-sm bg-red-50 text-red-700 rounded px-3 py-1.5 hover:bg-red-100"
            >
              Delete
            </button>
          </BlogCard>
        ))}
      </div>
    </div>
  );
}
