const { createPool } = require('mysql2/promise');

const pool = createPool({
  host: 'localhost',
  database: 'eco',
  user: 'root',
  password: '',
});

module.exports = { pool };
