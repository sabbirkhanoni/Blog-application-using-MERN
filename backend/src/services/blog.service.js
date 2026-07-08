import {
  findApprovedRepo,
  findByAuthorIdRepo,
  createRepo,
  findByBlogsIdRepo,
  updateContentRepo,
  removeRepo,
} from "../repositories/blog.repository.js";

//Get all approved blogs.
async function getApprovedBlogsService() {
  return findApprovedRepo();
}

//Get all blogs authored by the logged-in user.
async function getMyBlogsService(userId) {
  return findByAuthorIdRepo(userId);
}

//Create a new blog. The status is always set to 'Pending' initially.
async function createBlogService({ title, content, authorId }) {
  return createRepo({ title, content, authorId });
}

// Update a blog. Only the owner of the blog may update it. The status is reset to 'Pending' after an update.
async function updateBlogService({ blogId, userId, title, content }) {
  const existingBlog = await findByBlogsIdRepo(blogId);

  if (!existingBlog) {
    throw new Error("Blog not found");
  }

  if (existingBlog.author_id !== userId) {
    throw new Error("You are not allowed to update this blog");
  }

  const updatedBlog = await updateContentRepo(blogId, {
    title,
    content,
    status: "Pending",
  });

  return updatedBlog;
}

// Delete a blog. Only the owner of the blog may delete it.
async function deleteBlogService({ blogId, userId }) {
  const existingBlog = await findByBlogsIdRepo(blogId);

  if (!existingBlog) {
    throw new Error("Blog not found");
  }

  if (existingBlog.author_id !== userId) {
    throw new Error("You are not allowed to delete this blog");
  }

  await removeRepo(blogId);
}

export {
  getApprovedBlogsService,
  getMyBlogsService,
  createBlogService,
  updateBlogService,
  deleteBlogService,
};