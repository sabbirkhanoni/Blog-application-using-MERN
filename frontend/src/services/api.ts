/**
 * Shared Axios instance.
 * `withCredentials: true` is required so the express-session cookie
 * is sent with every request (session-based auth, no JWT).
 */
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

export default api;
