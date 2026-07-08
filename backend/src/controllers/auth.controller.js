import loginService from "../services/auth.service.js";


//POST /auth/login
async function loginController(request, response) {
  const { email, password } = request.body;

  try {
    const user = await loginService(email, password);
    // Store user info in the session
    request.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return response.status(200).json({
      success: true,
      error: false,
      message: "Login successful",
      user: request.session.user,
    });
  } catch (err) {
    console.error("Login error:", err);
    return response.status(401).json({
      success: false,
      error: true,
      message: err.message,
    });
  }
}

//POST /auth/logout
//Destroys the current session.
function logoutController(request, response) {
  request.session.destroy((err) => {
    if (err) {
      return response.status(500).json({
        success: false,
        error: true,
        message: "Failed to log out",
      });
    }
    response.clearCookie("blog.sid");
    return response.status(200).json({
      success: true,
      error: false,
      message: "Logged out successfully",
    });
  });
}

export { loginController, logoutController };
