const mysql = require('mysql2/promise'); // Import with promise support

const pool = mysql.createPool({
  host: 'localhost',
  user: "root",
  password: "",
  database: "apicompany",
})

exports.pool = pool;