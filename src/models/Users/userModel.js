const { connection } = require('../../config/database');

const getUserByEmail = (email) => {
  const queryString = 'SELECT * FROM users WHERE email = ?';
  return new Promise((resolve, reject) => {
    connection.query(queryString, [email], (err, result) => {
      if (err) {
        console.error('Error from userModel.js', { err });
        reject(err);
      }

      console.log(`Getting user email by ${email}`, { result });

      resolve(result[0]);
    });
  });
};

const createUser = ({
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
    'INSERT INTO users (name, email, password, last_name, number, city, country, rol_id, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  return new Promise((resolve, reject) => {
    connection.query(
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
      ],
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
    connection.query(
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

  return new Promise((resolve, reject) => {
    connection.query(query, [userId], (err, result, fields) => {
      if (err) {
        console.error('Error from userModel.js', { err });
        return reject(err);
      }
      // Si quieres retornar algún mensaje indicando que el usuario ha sido eliminado con éxito, puedes hacerlo aquí.
      resolve(result.affectedRows); // Número de filas afectadas por la operación DELETE
    });
  });
};

module.exports = {
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
