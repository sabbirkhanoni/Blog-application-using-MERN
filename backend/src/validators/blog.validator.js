//Validates POST /blogs and PUT /blogs/:id body: { title, content }
  
function validateBlog(request, response, next) {
  const { title, content } = request.body;
  const errors = [];

  if (!title || typeof title !== "string" || !title.trim()) {
    errors.push("Title is required");
  }

  if (!content || typeof content !== "string" || !content.trim()) {
    errors.push("Content is required");
  }

  if (errors.length > 0) {
    return response.status(400).json({
      success: false,
      error: true,
      errors,
    });
  }

  next();
}

export default validateBlog;
