import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Blog } from '../utils/types';
import { getMyBlogs, updateBlog } from '../features/blog/blog.service';
import BlogForm from '../features/blog/BlogForm';

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyBlogs()
      .then((blogs) => {
        const found = blogs.find((b) => b.id === Number(id));
        if (!found) {
          setError('Blog not found or you do not have access to it');
        } else {
          setBlog(found);
        }
      })
      .catch(() => setError('Failed to load blog'))
      .finally(() => setIsLoading(false));
  }, [id]);

  async function handleUpdate(title: string, content: string) {
    await updateBlog(Number(id), title, content);
    navigate('/my-blogs');
  }

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Blog</h1>
      {blog && (
        <BlogForm
          initialTitle={blog.title}
          initialContent={blog.content}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}
