import { useEffect, useState } from 'react';
import type { Blog } from '../utils/types';
import { getApprovedBlogs } from '../features/blog/blog.service';
import BlogCard from '../features/blog/BlogCard';

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getApprovedBlogs()
      .then(setBlogs)
      .catch(() => setError('Failed to load blogs'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Latest Blogs</h1>

      {isLoading && <p className="text-gray-500">Loading blogs...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!isLoading && !error && blogs.length === 0 && (
        <p className="text-gray-500">No approved blogs yet.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} showAuthor />
        ))}
      </div>
    </div>
  );
}
