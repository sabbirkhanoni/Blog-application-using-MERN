import { getApprovedBlogsService, getMyBlogsService, createBlogService, updateBlogService, deleteBlogService } from '../services/blog.service.js';

 //GET /blogs
 //Public endpoint - returns only approved blogs. No auth required.
async function getApprovedBlogsController(req, res) {
  try {
    const blogs = await getApprovedBlogsService();
    return res.status(200).json({
      success: true,
      error: false,
      blogs
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true, 
      message: 'Failed to fetch blogs' });
  }
}


//GET /blogs/my
//Returns all blogs (any status) belonging to the logged-in user.
async function getMyBlogsController(req, res) {
  try {
    const userId = req.session.user.id;
    const blogs = await getMyBlogsService(userId);
    return res.status(200).json({
      success: true,
      error: false,
      blogs
     });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Failed to fetch your blogs' });
  }
}


//POST /blogs
//Creates a new blog for the logged-in user. Status always starts as 'Pending'.
async function createBlogController(req, res) {
  try {
    const { title, content } = req.body;
    const authorId = req.session.user.id;

    const blog = await createBlogService({ title, content, authorId });
    return res.status(201).json({
      success: true,
      error: false,
      blog
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Failed to create blog'
    });
  }
}


//PUT /blogs/:id
//Updates a blog owned by the logged-in user.
async function updateBlogController(req, res) {
  try {
    const blogId = Number(req.params.id);
    const userId = req.session.user.id;
    const { title, content } = req.body;

    const blog = await updateBlogService({ blogId, userId, title, content });
    return res.status(200).json({
      success: true,
      error: false,
      blog
    });
  } catch (err) {
    console.error('Update blog error:', err);
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Failed to update blog'
    });
  }
}


//DELETE /blogs/:id
//Deletes a blog owned by the logged-in user.
async function deleteBlogController(req, res) {
  try {
    const blogId = Number(req.params.id);
    const userId = req.session.user.id;

    await deleteBlogService({ blogId, userId });
    return res.status(200).json({
      success: true,
      error: false,
      message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Delete blog error:', err);
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message });
  }
}

export {
  getApprovedBlogsController,
  getMyBlogsController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
};
