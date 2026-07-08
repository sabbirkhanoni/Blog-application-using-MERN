//Middleware to protect routes that require authentication. Checks if the user is logged in
function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      success: false,
      error: true,
      message: 'Authentication required' 
    });
  }
  next();
}

export default requireAuth;
