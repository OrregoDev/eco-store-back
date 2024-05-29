const { pool: poolmysql } = require("../../config/database");

const getProductByName = (name) => {
  const queryString = "SELECT * FROM products WHERE name = ?";
  return new Promise((resolve, reject) => {
    poolmysql.query(queryString, [name], (err, result) => {
      if (err) {
        console.error("Error from userModel.js", { err });
        reject(err);
      }
      console.log(`Getting product by ${name}`, { result });
      resolve(result[0]);
    });
  });
};

const getProductByIdCategory = async (id_category) => {
  const query = "SELECT * FROM products WHERE id_category = ?"
  const values = [id_category]
  const [rows] = await poolmysql.query(query, values);
  return rows;
};

const createProduct = ({ name, price, quantity, image, id_category }) => {
  const query =
    "INSERT INTO products (name, price, quantity, image, id_category) VALUES (?, ?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    poolmysql.query(
      query,
      [name, price, quantity, image, id_category],
      (err, result, fields) => {
        if (err) {
          console.error("Error from userModel.js", { err });
          return reject(err);
        }
        resolve(result.insertId);
      }
    );
  });
};


const updateProduct = ({ name, price, quantity, image, id_category }) => {
  const query =
    "UPDATE users SET name = ?, price = ?, quantity = ?, image = ?, id_category WHERE id = ?";

  return new Promise((resolve, reject) => {
    poolmysql.query(
      query,
      [
        name,
        price,
        quantity,
        image,
        id_category,
        id,
      ],
      (err, result, fields) => {
        if (err) {
          console.error("Error from userModel.js", { err });
          return reject(err);
        }
        resolve(result.affectedRows); // Número de filas afectadas por la operación UPDATE
      }
    );
  });
};

const searchProduct = async (name) => {
  const queryString = "SELECT * FROM products WHERE name LIKE ?";
  const values = [`%${name}%`]
  const [rows] = await poolmysql.query(queryString, values);
  return rows;
};

module.exports = {
  getProductByName,
  createProduct,
  updateProduct,
  getProductByIdCategory,
  searchProduct
};
