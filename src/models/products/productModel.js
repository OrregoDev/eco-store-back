const { connection } = require('../../config/database');

const getProductByName = (name) => {
  const queryString = 'SELECT * FROM products WHERE name = ?';
  return new Promise((resolve, reject) => {
    connection.query(queryString, [name], (err, result) => {
      if (err) {
        console.error('Error from userModel.js', { err });
        reject(err);
      }

      console.log(`Getting product email by ${name}`, { result });

      resolve(result[0]);
    });
  });
};

const createProduct = ({ name, price, quantity, image, id_category }) => {
  const query =
    'INSERT INTO products (name, price, quantity, image, id_category) VALUES (?, ?, ?, ?, ?)';

  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [name, price, quantity, image, id_category],
      (err, result, fields) => {
        if (err) {
          console.error('Error from userModel.js', { err });
          return reject(err);
        }
        resolve(result.insertId);
      }
    );
  });
};

module.exports = {
  getProductByName,
  createProduct,
};
