const { pool: poolmysql } = require('../../config/database');

const getCommentByIdAuthor = async (id_author) => {
  const queryString = 'SELECT * FROM comments WHERE id_author = ?';
  const values = [id_author];
  const [rows] = await poolmysql.query(queryString, values);
  return rows;
};

const createComment = async ({
  id_author,
  title,
  content,
  id_article,
  approved,
}) => {
  const query =
    'INSERT INTO products (id_author, title, content, id_article, approved) VALUES (?, ?, ?, ?, ?)';
  const values = [id_author, title, content, id_article, approved];
  const [rows] = await poolmysql.query(query, values);
  return rows;
};

const deleteComment = async (id) => {
  const query = 'DELETE FROM comments WHERE id = ?';
  const values = [id];
  const [rows] = await poolmysql.query(query, values);
  return rows;
};

module.exports = {
  getCommentByIdAuthor,
  createComment,
  deleteComment,
};
