import { pool } from "./database.js";

const resetDatabase = async () => {
  try {
    // Drop tables if they already exist
    await pool.query(`DROP TABLE IF EXISTS events`);
    await pool.query(`DROP TABLE IF EXISTS locations`);

    // Create locations table
    await pool.query(`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT,
        city TEXT,
        state TEXT,
        zip TEXT
      );
    `);

    // Create events table
    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        date DATE,
        location_id INTEGER,
        FOREIGN KEY (location_id) REFERENCES locations(id)
      );
    `);

    console.log("Database tables created successfully");
  } catch (err) {
    console.error("Error resetting database:", err);
  } finally {
    pool.end();
  }
};

resetDatabase();
