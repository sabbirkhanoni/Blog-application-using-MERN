import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
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
