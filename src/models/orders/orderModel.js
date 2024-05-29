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

module.exports = {
  createOrder,
  getOrderById,
  deleteOrder,
};
