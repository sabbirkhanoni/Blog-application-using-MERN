import express from 'express';
import { getPendingBlogsController, approveBlogController, rejectBlogController } from '../controllers/admin.controller.js';
import requireAuth from '../middlewares/auth.middleware.js';
import requireAdmin from '../middlewares/admin.middleware.js';

const adminRouter = express.Router();

adminRouter.get('/blogs/pending', requireAuth, requireAdmin, getPendingBlogsController);
adminRouter.patch('/blogs/:id/approve', requireAuth, requireAdmin, approveBlogController);
adminRouter.patch('/blogs/:id/reject', requireAuth, requireAdmin, rejectBlogController);

export default adminRouter;
