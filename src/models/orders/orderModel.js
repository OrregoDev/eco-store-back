const { pool: poolmysql } = require('../../config/database');

const createOrder = ({ id_user, product_id, payment_method, address }) => {
  const query =
    'INSERT INTO orders (id_user, product_id, payment_method, address) VALUES (?, ?, ?, ?)';
  return new Promise((resolve, reject) => {
    poolmysql.query(
      query,
      [id_user, product_id, payment_method, address],
      (err, result) => {
        if (err) {
          console.error('Error from userModel.js', { err });
          return reject(err);
        }
        resolve(result.insertId);
      }
    );
  });
};

const updateOrder = ({
  orderId,
  id_user,
  product_id,
  payment_method,
  address,
}) => {
  const query =
    'UPDATE orders SET id_user =?, product_id =?, payment_method =?, address =? WHERE OrderID =?';
  return new Promise((resolve, reject) => {
    poolmysql.query(
      query,
      [id_user, product_id, payment_method, address, orderId],
      (err, result) => {
        if (err) {
          console.error('Error from userModel.js', { err });
          return reject(err);
        }
        resolve(result.affectedRows > 0);
      }
    );
  });
};

const deleteOrder = (orderId) => {
  const query = 'DELETE FROM orders WHERE OrderID =?';
  return new Promise((resolve, reject) => {
    poolmysql.query(query, [orderId], (err, result) => {
      if (err) {
        console.error('Error from userModel.js', { err });
        return reject(err);
      }
      resolve(result.affectedRows > 0); // Retorna true si se eliminó al menos una fila
    });
  });
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
};
