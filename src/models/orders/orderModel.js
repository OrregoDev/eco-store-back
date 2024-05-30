const { pool: poolmysql } = require('../../config/database');

const createOrder = async (id_user, product_id, payment_method, address) => {
  const query =
    'INSERT INTO orders (id_user, product_id, payment_method, address) VALUES (?, ?, ?, ?)';
  const values = [id_user, product_id, payment_method, address];
  const [rows] = await poolmysql.query(query, values);
  return rows;
};

const getOrderById = async (id) => {
  const query = 'SELECT * FROM orders WHERE id = ?';
  const values = [id];
  const [rows] = await poolmysql.query(query, values);
  return rows;
};

const deleteOrder = async (id) => {
  const query = 'DELETE FROM orders WHERE id = ?';
  const values = [id];
  const [rows] = await poolmysql.query(query, values);
  return rows;
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

module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
