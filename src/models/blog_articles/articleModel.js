const { connection } = require('../../config/database');

const getArticleByTitle = (title) => {
  const queryString = 'SELECT * FROM articles WHERE title = ?';
  return new Promise((resolve, reject) => {
    connection.query(queryString, [title], (err, result) => {
      if (err) {
        console.error('Error from userModel.js', { err });
        reject(err);
      }

      console.log(`Getting article by ${title}`, { result });

      resolve(result[0]);
    });
  });
};

const createArticle = ({ id_author, title, summary, content }) => {
  const query =
    'INSERT INTO products (id_author, title, summary, content) VALUES (?, ?, ?, ?)';

  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [id_author, title, summary, content],
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
  getArticleByTitle,
  createArticle,
};
