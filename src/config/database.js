const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'eco',
  user: 'root',
  password: '',
});

connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log('connection');
  }
});

module.exports = { connection };
