import express from 'express';
import { getApprovedBlogsController, getMyBlogsController, createBlogController, updateBlogController, deleteBlogController } from '../controllers/blog.controller.js';
import validateBlog from '../validators/blog.validator.js';
import requireAuth from '../middlewares/auth.middleware.js';

const blogRouter = express.Router();
// Public route
blogRouter.get('/', getApprovedBlogsController);

// Authenticated routes
blogRouter.get('/my', requireAuth, getMyBlogsController);
blogRouter.post('/', requireAuth, validateBlog, createBlogController);
blogRouter.put('/:id', requireAuth, validateBlog, updateBlogController);
blogRouter.delete('/:id', requireAuth, deleteBlogController);

export default blogRouter;
