import { getPendingBlogsService, approveBlogService, rejectBlogService } from "../services/admin.service.js";

/**
 * GET /admin/blogs/pending
 */
async function getPendingBlogsController(request, response) {
  try {
    const blogs = await getPendingBlogsService();
    if (!blogs || blogs.length === 0) {
      return response.status(200).json({
        success: true,
        error: false,
        blogs: [],
      });
    }
    return response.status(200).json({
      success: true,
      error: false,
      blogs,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      error: true,
      message: "Failed to fetch pending blogs",
    });
  }
}

/**
 * PATCH /admin/blogs/:id/approve
 */
async function approveBlogController(request, response) {
  try {
    const blogId = Number(request.params.id);
    const blog = await approveBlogService(blogId);
    return response.status(200).json({
      success: true,
      error: false,
      blog,
    });
  } catch (error) {
    console.error("Approve blog error:", error);
    return response.status(400).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
}


/**
 * PATCH /admin/blogs/:id/reject
 */
async function rejectBlogController(request, response) {
  try {
    const blogId = Number(request.params.id);
    const blog = await rejectBlogService(blogId);
    return response.status(200).json({
      success: true,
      error: false,
      blog,
    });
  } catch (error) {
    console.error("Reject blog error:", error);
    return response.status(400).json({
      success: false,
      error: true,
      message: error.message || "Failed to reject blog",
    });
  }
}

export { getPendingBlogsController, approveBlogController, rejectBlogController };
