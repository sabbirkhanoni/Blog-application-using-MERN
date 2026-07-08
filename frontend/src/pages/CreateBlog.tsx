import { useNavigate } from 'react-router-dom';
import BlogForm from '../features/blog/BlogForm';
import { createBlog } from '../features/blog/blog.service';

export default function CreateBlog() {
  const navigate = useNavigate();

  async function handleCreate(title: string, content: string) {
    await createBlog(title, content);
    navigate('/my-blogs');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Blog</h1>
      <BlogForm onSubmit={handleCreate} />
    </div>
  );
}
