const { pool: poolmysql } = require('../../config/database');

const getArticleByTitle = async (title) => {
  const queryString = 'SELECT * FROM articles WHERE title = ?';
  const values = [title];
  const [rows] = await poolmysql.query(queryString, values);
  return rows;
};

const getArticleById = async (id) => {
  const query = 'SELECT * FROM acticles WHERE id = ?';
  const values = [id];
  const [rows] = await poolmysql.query(query, values);
  return rows[0];
};

const createArticle = async (id_author, title, summary, content) => {
  const query =
    'INSERT INTO products (id_author, title, summary, content) VALUES (?, ?, ?, ?)';
  const values = [id_author, title, summary, content];
  const [rows] = await poolmysql.query(query, values);
  return rows;
};

const deleteArticle = async (id) => {
  const query = 'DELETE FROM comments WHERE id = ?';
  const values = [id];
  const [rows] = await poolmysql.query(query, values);
  return rows;
};

module.exports = {
  getArticleByTitle,
  createArticle,
  getArticleById,
  deleteArticle,
};
