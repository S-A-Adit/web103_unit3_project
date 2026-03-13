import { pool } from "../config/database.js";

const getLocations = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM locations");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

export { getLocations };
