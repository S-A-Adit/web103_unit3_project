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

    // Seed locations
    await pool.query(`
      INSERT INTO locations (name, address, city, state, zip) VALUES
        ('Unity Community Center', '123 Main St', 'Springfield', 'IL', '62701'),
        ('Grid Park Pavilion', '456 Oak Ave', 'Springfield', 'IL', '62702'),
        ('Plaza Arts Hall', '789 Elm Blvd', 'Springfield', 'IL', '62703');
    `);

    // Seed events
    await pool.query(`
      INSERT INTO events (title, description, date, location_id) VALUES
        ('Community Meetup', 'Monthly neighborhood gathering for residents.', '2026-04-10', 1),
        ('Farmers Market', 'Fresh produce and local vendors every weekend.', '2026-04-12', 1),
        ('Outdoor Movie Night', 'Free screening under the stars.', '2026-04-18', 2),
        ('Spring Concert', 'Live music featuring local artists.', '2026-04-20', 2),
        ('Art Exhibition Opening', 'Showcase of regional artists and performers.', '2026-04-25', 3),
        ('Workshop: Urban Gardening', 'Learn how to grow your own food in small spaces.', '2026-05-02', 3);
    `);

    console.log("Database tables created and seeded successfully");
  } catch (err) {
    console.error("Error resetting database:", err);
  } finally {
    pool.end();
  }
};

resetDatabase();
