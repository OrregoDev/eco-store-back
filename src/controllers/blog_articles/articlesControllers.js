const { createArticle } = require("../../models/blog_articles/articleModel");

const register_Article = async (req, res) => {
  try {
    const { id_author, title, summary, content } = req.body; // Extrae los nuevos campos
    const newOrderId = await createArticle({id_author, title, summary, content}); // Pasa los nuevos campos al método createUser
    res.status(201).json({
      message: `Order registered successfully with id: ${newOrderId}`,
    });
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register_Article,
};
