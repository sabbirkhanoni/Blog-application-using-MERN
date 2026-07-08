/**
 * Blog Service (frontend)
 * Wraps API calls related to blogs (public, user, and admin actions).
 */
import api from '../../services/api';
import type { Blog } from '../../utils/types';

// Public
export async function getApprovedBlogs(): Promise<Blog[]> {
  const response = await api.get('/blogs');
  return response.data.blogs;
}

// User (authenticated)
export async function getMyBlogs(): Promise<Blog[]> {
  const response = await api.get('/blogs/my');
  return response.data.blogs;
}

export async function createBlog(title: string, content: string): Promise<Blog> {
  const response = await api.post('/blogs', { title, content });
  return response.data.blog;
}

export async function updateBlog(id: number, title: string, content: string): Promise<Blog> {
  const response = await api.put(`/blogs/${id}`, { title, content });
  return response.data.blog;
}

export async function deleteBlog(id: number): Promise<void> {
  await api.delete(`/blogs/${id}`);
}

// Admin
export async function getPendingBlogs(): Promise<Blog[]> {
  const response = await api.get('/admin/blogs/pending');
  return response.data.blogs;
}

export async function approveBlog(id: number): Promise<Blog> {
  const response = await api.patch(`/admin/blogs/${id}/approve`);
  return response.data.blog;
}

export async function rejectBlog(id: number): Promise<Blog> {
  const response = await api.patch(`/admin/blogs/${id}/reject`);
  return response.data.blog;
}
