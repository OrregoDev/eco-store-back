const { connection } = require('../../config/database');

const createOrder = ({ id_user, product_id, payment_method, adress }) => {
  const query =
    'INSERT INTO orders (id_user, product_id, payment_method, adress) VALUES (?, ?, ?, ?)';
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [id_user, product_id, payment_method, adress],
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
  createOrder,
};
