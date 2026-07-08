import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-lg font-bold text-gray-900">
        BlogApplication
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>

        {/* Normal User */}
        {user?.role === "user" && (
          <>
            <Link to="/my-blogs" className="text-gray-700 hover:text-blue-600">
              My Blogs
            </Link>
          </>
        )}

        {/* Admin */}
        {user?.role === "admin" && (
          <Link to="/admin" className="text-gray-700 hover:text-blue-600">
            Admin
          </Link>
        )}

        {user ? (
          <>
            <span className="text-gray-500">Hi, {user.name}</span>

            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white rounded px-3 py-1.5 hover:bg-gray-900"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white rounded px-3 py-1.5 hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
