const { pool: poolmysql } = require('../../config/database');

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const values = [email];
  const [rows] = await poolmysql.query(query, values);
  return rows[0];
};

const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const values = [id];
  const [rows] = await poolmysql.query(query, values);
  return rows[0];
};

const createUser = async ({
  name,
  email,
  password,
  last_name,
  number,
  address,
  city,
  country,
  rol_id,
}) => {
  //before inserting
  console.log('hashed_pass', password);
  const query =
    'INSERT INTO users (name, email, password, last_name, number, city, country, rol_id, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    name,
    email,
    password,
    last_name,
    number,
    city,
    country,
    rol_id,
    address,
  ];
  try {
    // Ejecuta la consulta usando el pool
    const [resp] = await poolmysql.query(query, values);
    console.log('Resultados de la consulta:', resp.insertId);
    return {
      id: resp.insertId,
      name,
      email,
      password,
      last_name,
      number,
      city,
      country,
      rol_id,
      address,
    };
  } catch (err) {
    // Maneja el error adecuadamente
    console.error('Error ejecutando la consulta:', err);
    throw err;
  }
};

const updateUser = ({
  id,
  name,
  email,
  password,
  last_name,
  number,
  city,
  country,
  rol_id,
  address,
}) => {
  const query =
    'UPDATE users SET name = ?, email = ?, password = ?, last_name = ?, number = ?, city = ?, country = ?, rol_id = ?, address = ? WHERE id = ?';

  return new Promise((resolve, reject) => {
    poolmysql.query(
      query,
      [
        name,
        email,
        password,
        last_name,
        number,
        city,
        country,
        rol_id,
        address,
        id,
      ],
      (err, result, fields) => {
        if (err) {
          console.error('Error from userModel.js', { err });
          return reject(err);
        }
        resolve(result.affectedRows); // Número de filas afectadas por la operación UPDATE
      }
    );
  });
};

const deleteUser = (userId) => {
  const query = 'DELETE FROM users WHERE id = ?';
  console.log(userId);
  return new Promise((resolve, reject) => {
    poolmysql.query(query, [userId], (err, result, fields) => {
      if (err) {
        console.error('Error from userModel.js', { err });
        return reject(err);
      }
      // Si quieres retornar algún mensaje indicando que el usuario ha sido eliminado con éxito, puedes hacerlo aquí.
      resolve(result.affectedRows); // Número de filas afectadas por la operación DELETE
    });
  });
};

const getOrdersByUserId = async (userId) => {
  const query =
    'SELECT orders.* FROM orders INNER JOIN users ON orders.id_user = users.id WHERE users.id =?';
  const values = [userId];
  const [rows] = await poolmysql.query(query, values);
  return rows;
};

module.exports = {
  getUserByEmail,
  updateUser,
  deleteUser,
  createUser,
  getUserById,
  getOrdersByUserId,
};
