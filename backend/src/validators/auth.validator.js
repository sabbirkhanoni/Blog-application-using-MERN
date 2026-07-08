
//Validates POST /auth/login body: { email, password }

function validateLogin(request, response, next) {
  const { email, password } = request.body;
  const errors = [];

  if (!email || typeof email !== "string" || !email.trim()) {
    errors.push("Email is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  if (!password || typeof password !== "string" || !password.trim()) {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return response.status(400).json({
      success: false, 
      error: true, 
      errors 
    });
  }

  next();
}

export default validateLogin;
