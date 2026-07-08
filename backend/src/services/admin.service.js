import { findPendingRepo, findByBlogsIdRepo, updateStatusRepo } from '../repositories/blog.repository.js';

//Get all blogs currently pending review.
async function getPendingBlogsService() {
  return findPendingRepo();
}

//Approve a blog by its id.
async function approveBlogService(blogId) {
  const blog = await findByBlogsIdRepo(blogId);
  if (!blog) {
    throw new Error('Blog not found');
  }
  return updateStatusRepo(blogId, 'Approved');
}

//Reject a blog by id.
async function rejectBlogService(blogId) {
  const blog = await findByBlogsIdRepo(blogId);
  if (!blog) {
    throw new Error('Blog not found');
  }

  return updateStatusRepo(blogId, 'Rejected');
}

export {
  getPendingBlogsService,
  approveBlogService,
  rejectBlogService,
};
