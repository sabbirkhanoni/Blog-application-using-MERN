//Protects routes that require the logged-in user to have the 'admin' role.

function requireAdmin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      success: false,
      error: true,
      message: 'Authentication required' 
    });
  }

  if (req.session.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: true,
      message: 'Admin access required' 
    });
  }

  next();
}

export default requireAdmin;
