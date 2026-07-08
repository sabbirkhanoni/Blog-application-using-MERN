/**
 * PostgreSQL connection pool.
 * All repositories import `pool` from here to run raw SQL queries.
 */
import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

pool.on("error", (err) => {
  // Catches unexpected errors on idle clients so the process doesn't crash silently.
  console.error("Unexpected PostgreSQL client error:", err);
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL connection successful");
    client.release();
  } catch (err) {
    console.error("PostgreSQL connection error:", err);
  }
};

testConnection();

export default pool;
