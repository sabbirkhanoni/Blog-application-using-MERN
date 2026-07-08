import pool from "../config/db.js";

//Get all blogs with status = 'Approved'.
async function findApprovedRepo() {
  const result = await pool.query(
    `SELECT blogs.id, blogs.title, blogs.content, blogs.status,
            blogs.author_id, blogs.created_at, blogs.updated_at,
            users.name AS author_name
     FROM blogs
     JOIN users ON users.id = blogs.author_id
     WHERE blogs.status = 'Approved'
     ORDER BY blogs.created_at DESC`,
  );
  return result.rows;
}

//Get all blogs belonging to a specific author (any status).
//Used by "My Blogs" page.
async function findByAuthorIdRepo(authorId) {
  const result = await pool.query(
    `SELECT id, title, content, status, author_id, created_at, updated_at
     FROM blogs
     WHERE author_id = $1
     ORDER BY created_at DESC`,
    [authorId],
  );
  return result.rows;
}

//Get all blogs with status = 'Pending'.
async function findPendingRepo() {
  const result = await pool.query(
    `SELECT blogs.id, blogs.title, blogs.content, blogs.status,
            blogs.author_id, blogs.created_at, blogs.updated_at,
            users.name AS author_name, users.email AS author_email
     FROM blogs
     JOIN users ON users.id = blogs.author_id
     WHERE blogs.status = 'Pending'
     ORDER BY blogs.created_at ASC`,
  );
  return result.rows;
}

//Find a single blog by its id.
async function findByBlogsIdRepo(id) {
  const result = await pool.query(
    `SELECT id, title, content, status, author_id, created_at, updated_at
     FROM blogs
     WHERE id = $1`,
    [id],
  );
  return result.rows[0] || null;
}

//Create a new blog. Status always starts as 'Pending'.
async function createRepo({ title, content, authorId }) {
  const result = await pool.query(
    `INSERT INTO blogs (title, content, status, author_id)
     VALUES ($1, $2, 'Pending', $3)
     RETURNING id, title, content, status, author_id, created_at, updated_at`,
    [title, content, authorId],
  );
  return result.rows[0];
}


//Update the title/content of a blog
//whether an edit should reset status back to 'Pending'.
async function updateContentRepo(id, { title, content, status }) {
  const result = await pool.query(
    `UPDATE blogs
     SET title = $1, content = $2, status = $3, updated_at = NOW()
     WHERE id = $4
     RETURNING id, title, content, status, author_id, created_at, updated_at`,
    [title, content, status, id],
  );
  return result.rows[0] || null;
}

//Update the status of a blog (approve/reject).
async function updateStatusRepo(id, status) {
  const result = await pool.query(
    `UPDATE blogs
     SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id, title, content, status, author_id, created_at, updated_at`,
    [status, id],
  );
  return result.rows[0] || null;
}

//Delete a blog by its id.
async function removeRepo(id) {
  const result = await pool.query(
    "DELETE FROM blogs WHERE id = $1 RETURNING id",
    [id],
  );
  return result.rows[0] || null;
}

export {
  findApprovedRepo,
  findByAuthorIdRepo,
  findPendingRepo,
  findByBlogsIdRepo,
  createRepo,
  updateContentRepo,
  updateStatusRepo,
  removeRepo,
};
