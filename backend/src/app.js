
//Wires together middlewares and routes.

import express from "express";
import cors from "cors";
import sessionMiddleware from "./config/session.js";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// Allow requests from the frontend and allow cookies to be sent.
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json()); // Parse JSON request bodies
app.use(sessionMiddleware);

// GET /me - returns the currently logged-in user
app.get("/me", (request, response) => {
  if (!request.session || !request.session.user) {
    return response.status(401).json({
      success: false,
      error: true,
      message: "Not authenticated"
    });
  }
  return response.status(200).json({
    success: true,
    error: false,
    user: request.session.user
  });
});

// Feature routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/admin', adminRoutes);

export default app;
