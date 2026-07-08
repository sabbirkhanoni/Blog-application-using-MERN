# BlogApplication

A full-stack blog application with session-based authentication, role-based access control, and a PostgreSQL backend.

## Tech Stack

- Frontend: React 19, TypeScript, Vite, React Router DOM, Axios
- Backend: Node.js, Express.js, PostgreSQL, express-session
- Styling: Tailwind CSS
- Data access: raw SQL with `pg` (no ORM)

## Features

- User login/logout with session cookies
- Public blog listing for approved posts only
- Authenticated users can create, edit, delete, and view their own blogs
- Admin can review pending blogs and approve/reject them
- Session restoration on page refresh through `GET /me`

## Project Structure

```
BlogApplication/
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── repositories/
│       ├── routes/
│       ├── services/
│       └── validators/
└── frontend/
    ├── .env.example
    ├── package.json
    └── src/
        ├── app/
        ├── components/
        ├── features/
        ├── layouts/
        ├── pages/
        ├── services/
        └── utils/
```

## Prerequisites

- Node.js 18 or newer
- PostgreSQL 14 or newer
- npm

## Installation Guide

### 1. Clone the project

```bash
git clone <your-repo-url>
cd BlogApplication
```

### 2. Backend setup

```bash
cd backend
npm install
copy .env.example .env
```

Update `backend/.env` with your local PostgreSQL credentials and server settings.

### 3. Frontend setup

```bash
cd ../frontend
npm install
copy .env.example .env
```

Set `VITE_API_URL` to your backend URL, usually `http://localhost:5000`.

### 4. Start both apps

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

### 5. Initialize the database

If you have not created the tables yet, run the SQL below in your PostgreSQL database.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending',
    author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

## Environment Variables

### Backend `.env`

| Variable | Example | Description |
| --- | --- | --- |
| `PORT` | `5000` | Express server port |
| `PGHOST` | `localhost` | PostgreSQL host |
| `PGPORT` | `5432` | PostgreSQL port |
| `PGUSER` | `postgres` | PostgreSQL username |
| `PGPASSWORD` | `postgres` | PostgreSQL password |
| `PGDATABASE` | `blog_applicationDB` | PostgreSQL database name |
| `SESSION_SECRET` | `change-this-secret-in-production` | Secret used to sign session cookies |
| `CLIENT_ORIGIN` | `http://localhost:5173` | Allowed frontend origin for CORS |

### Frontend `.env`

| Variable | Example | Description |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:5000` | Base URL for backend API requests |

## Database Schema

The backend repositories expect two tables: `users` and `blogs`.

### `users`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | integer | Primary key |
| `name` | text | User display name |
| `email` | text | Unique login identifier |
| `password` | text | Stored as plain text in this project |
| `role` | text | `admin` or `user` |
| `created_at` | timestamp | Creation time |

### `blogs`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | integer | Primary key |
| `title` | text | Blog title |
| `content` | text | Blog body |
| `status` | text | `Pending`, `Approved`, or `Rejected` |
| `author_id` | integer | Foreign key to `users.id` |
| `created_at` | timestamp | Creation time |
| `updated_at` | timestamp | Last update time |

### Relationships

- One user can have many blogs.
- Approved blogs are public.
- Pending blogs are visible to admins only.

### Manual Seed Data

Use the following inserts if you want quick local test accounts.

```sql
INSERT INTO users (name, email, password, role)
VALUES
    ('Admin', 'admin@blog.com', '123456', 'admin'),
    ('User', 'user@blog.com', '123456', 'user');
```

## API Documentation

Base URL: `http://localhost:5000`

### Auth

#### `POST /auth/login`

Request body:

```json
{
    "email": "admin@blog.com",
    "password": "123456"
}
```

Success response:

```json
{
    "success": true,
    "error": false,
    "message": "Login successful",
    "user": {
        "id": 1,
        "name": "Admin",
        "email": "admin@blog.com",
        "role": "admin"
    }
}
```

#### `POST /auth/logout`

Destroys the current session.

### Session

#### `GET /me`

Returns the currently logged-in user from the session cookie.

Success response:

```json
{
    "success": true,
    "error": false,
    "user": {
        "id": 1,
        "name": "Admin",
        "email": "admin@blog.com",
        "role": "admin"
    }
}
```

Unauthorized response:

```json
{
    "success": false,
    "error": true,
    "message": "Not authenticated"
}
```

### Blogs

#### `GET /blogs`

Public endpoint. Returns only approved blogs.

Success response:

```json
{
    "success": true,
    "blogs": [
        {
            "id": 1,
            "title": "First Post",
            "content": "Hello world",
            "status": "Approved",
            "author_id": 2,
            "created_at": "2026-07-08T10:00:00.000Z",
            "updated_at": "2026-07-08T10:00:00.000Z",
            "author_name": "User"
        }
    ]
}
```

#### `GET /blogs/my`

Auth required. Returns all blogs for the logged-in user.

#### `POST /blogs`

Auth required. Creates a new blog.

Request body:

```json
{
    "title": "My new post",
    "content": "Blog content"
}
```

#### `PUT /blogs/:id`

Auth required. Owner only. Updates a blog and resets status to `Pending`.

#### `DELETE /blogs/:id`

Auth required. Owner only. Deletes a blog.

### Admin

#### `GET /admin/blogs/pending`

Admin only. Returns all pending blogs.

Success response:

```json
{
    "success": true,
    "error": false,
    "blogs": []
}
```

#### `PATCH /admin/blogs/:id/approve`

Admin only. Approves a pending blog.

#### `PATCH /admin/blogs/:id/reject`

Admin only. Rejects a pending blog.

## Response Format

The API generally returns JSON in these shapes:

Success:

```json
{
    "success": true,
    "error": false,
    "message": "Optional message",
    "user": {},
    "blog": {},
    "blogs": []
}
```

Error:

```json
{
    "success": false,
    "error": true,
    "message": "Something went wrong"
}
```

Validation errors:

```json
{
    "success": false,
    "error": true,
    "errors": ["Title is required", "Content is required"]
}
```

## Postman Test Guide

### 1. Login

- Method: `POST`
- URL: `http://localhost:5000/auth/login`
- Body: raw JSON with `email` and `password`
- Expected: session cookie is set in the response

### 2. Restore session

- Method: `GET`
- URL: `http://localhost:5000/me`
- Expected: logged-in user object if the cookie is present

### 3. Fetch public blogs

- Method: `GET`
- URL: `http://localhost:5000/blogs`
- Expected: only approved blogs

### 4. Fetch my blogs

- Method: `GET`
- URL: `http://localhost:5000/blogs/my`
- Expected: all blogs owned by the logged-in user

### 5. Create blog

- Method: `POST`
- URL: `http://localhost:5000/blogs`
- Body: `{ "title": "Test", "content": "Test content" }`
- Expected: new blog with `Pending` status

### 6. Admin review

- Method: `GET`
- URL: `http://localhost:5000/admin/blogs/pending`
- Expected: pending blog list for admin only

- Method: `PATCH`
- URL: `http://localhost:5000/admin/blogs/:id/approve`
- Expected: blog status becomes `Approved`

- Method: `PATCH`
- URL: `http://localhost:5000/admin/blogs/:id/reject`
- Expected: blog status becomes `Rejected`

## Seeded Accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@blog.com` | `123456` |
| User | `user@blog.com` | `123456` |

## Important Notes

- Authentication is session-based using `express-session`; there is no JWT.
- Passwords are stored and compared as plain text in this project.
- `withCredentials: true` is required on the frontend Axios instance so the session cookie is sent.
- Admin can only approve/reject pending blogs; create/edit/delete are user actions.
