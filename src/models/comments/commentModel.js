const { pool: poolmysql } = require("../../config/database");

const getCommentByIdAuthor = (id_author) => {
  const queryString = "SELECT * FROM comments WHERE id_author = ?";
  return new Promise((resolve, reject) => {
    poolmysql.query(queryString, [id_author], (err, result) => {
      if (err) {
        console.error("Error from userModel.js", { err });
        reject(err);
      }

      console.log(`Getting comment by ${id_author}`, { result });

      resolve(result[0]);
    });
  });
};

const createComment = ({ id_author, title, content, id_article, approved }) => {
  const query =
    "INSERT INTO products (id_author, title, content, id_article, approved) VALUES (?, ?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    poolmysql.query(
      query,
      [id_author, title, content, id_article, approved],
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

module.exports = {
  getCommentByIdAuthor,
  createComment,
};
