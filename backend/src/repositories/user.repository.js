import pool from "../config/db.js";

//Find a user by their email address.
//Used during login.
async function findByEmailRepo(email) {
  const result = await pool.query(
    'SELECT id, name, email, password, role, created_at FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

//Find a user by their id.
async function findByIdRepo(id) {
  const result = await pool.query(
    'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export { findByEmailRepo, findByIdRepo };
