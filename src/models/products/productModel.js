const { pool: poolmysql } = require('../../config/database');

const getProductByName = async (name) => {
  const queryString = 'SELECT * FROM products WHERE name = ?';
  const values = [name];
  const [rows] = await poolmysql.query(queryString, values);
  return rows;
};

const getProductByIdCategory = async (id_category) => {
  const query = 'SELECT * FROM products WHERE id_category = ?';
  const values = [id_category];
  const [rows] = await poolmysql.query(query, values);
  return rows;
};

const createProduct = async (name, price, quantity, image, id_category) => {
  const query =
    'INSERT INTO products (name, price, quantity, image, id_category) VALUES (?, ?, ?, ?, ?)';
  const values = [name, price, quantity, image, id_category];
  const [rows] = await poolmysql.query(query, values);
  return rows;
};

const updateProduct = async (name, price, quantity, image, id_category) => {
  const query =
    'UPDATE products SET name = ?, price = ?, quantity = ?, image = ?, id_category WHERE id = ?';
  const values = [name, price, quantity, image, id_category];
  const [rows] = await poolmysql.query(query, values);
  return rows;
};

const searchProduct = async (name) => {
  const queryString = 'SELECT * FROM products WHERE name LIKE ?';
  const values = [`%${name}%`];
  const [rows] = await poolmysql.query(queryString, values);
  return rows;
};

module.exports = {
  getProductByName,
  createProduct,
  updateProduct,
  getProductByIdCategory,
  searchProduct,
};
