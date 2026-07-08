# BlogApplication

A simple full-stack blog application.

- **Frontend:** React.js + TypeScript + Vite, feature-based architecture, React Router DOM, Axios, Tailwind CSS
- **Backend:** Node.js + Express.js, clean layered architecture (Route → Validation → Controller → Service → Repository → Database), PostgreSQL via the raw `pg` package (no ORM)
- **Auth:** express-session (no JWT), plain-text password comparison (no hashing), stored in the session

## Project Structure

```
BlogApplication/
├── backend/
│   ├── db/
│   │   ├── schema.sql       # table definitions
│   │   ├── seed.sql         # seeds admin + user + sample blogs
│   │   └── seed.js          # runs schema.sql + seed.sql against the DB
│   └── src/
│       ├── config/          # db pool, session config
│       ├── routes/          # Express routers
│       ├── controllers/     # request/response only
│       ├── services/        # business logic
│       ├── repositories/    # raw SQL queries
│       ├── validators/      # request validation
│       ├── middlewares/     # auth.middleware.js, admin.middleware.js
│       ├── app.js
│       └── server.js
└── frontend/
    └── src/
        ├── app/              # App.tsx (routes)
        ├── components/       # Navbar, ProtectedRoute, AdminRoute, StatusBadge
        ├── features/
        │   ├── auth/         # AuthContext, LoginForm, auth.service.ts
        │   └── blog/         # BlogCard, BlogForm, blog.service.ts
        ├── layouts/          # MainLayout
        ├── pages/            # Home, Login, UserDashboard, MyBlogs, CreateBlog, EditBlog, AdminDashboard, NotFound
        ├── services/         # api.ts (shared Axios instance)
        └── utils/            # types.ts
```

## Prerequisites

- Node.js 18+
- PostgreSQL running locally (or accessible via connection settings)

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env with your PostgreSQL credentials
```

Create the database (name should match `PGDATABASE` in your `.env`):

```bash
createdb blog_application
```

Initialize the schema and seed data (creates the two required users + a couple of sample blogs):

```bash
npm run seed
```

Start the backend:

```bash
npm run dev     # with nodemon
# or
npm start
```

The API runs at `http://localhost:5000` by default (see `PORT` in `.env`).

### Seeded accounts

| Role  | Email            | Password |
|-------|------------------|----------|
| Admin | admin@blog.com   | 123456   |
| User  | user@blog.com    | 123456   |

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL should point to the backend, e.g. http://localhost:5000
npm run dev
```

The frontend runs at `http://localhost:5173` by default.

## API Endpoints

### Auth
- `POST /auth/login` — body: `{ email, password }`
- `POST /auth/logout`

### Blog (user)
- `GET /blogs` — public, returns only approved blogs
- `GET /blogs/my` — auth required, returns the logged-in user's blogs (any status)
- `POST /blogs` — auth required, body: `{ title, content }`, status starts as `Pending`
- `PUT /blogs/:id` — auth required, owner only, resets status to `Pending`
- `DELETE /blogs/:id` — auth required, owner only

### Admin
- `GET /admin/blogs/pending` — admin only
- `PATCH /admin/blogs/:id/approve` — admin only
- `PATCH /admin/blogs/:id/reject` — admin only

### Session
- `GET /me` — returns the currently logged-in user (used by the frontend to restore session state on refresh)

## Notes

- Passwords are stored and compared as plain text, per project requirements (no hashing).
- Authentication uses `express-session` only — no JWTs.
- Only two middlewares are used: `auth.middleware.js` (requires login) and `admin.middleware.js` (requires admin role).
- No models folder — PostgreSQL is accessed via raw SQL in the repository layer using the `pg` package.
