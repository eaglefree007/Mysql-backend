// const pool = require('../config/db'); 

const { pool } = require('../config/db');

const checkConnection = async () => {
  try {
    const [rows] = await pool.query('SELECT 1'); 
    if (rows.length > 0) {
      return { status: 'success', message: 'Database connection successful!' };
    } else {
      return { status: 'error', message: 'No data received from the database.' };
    }
  } catch (error) {
    return { status: 'error', message: `Database connection error: ${error.message}` };
  }
};

module.exports = {
  checkConnection,
};