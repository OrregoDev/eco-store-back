// COMMENTS
const { createComment } = require("../../models/comments/commentModel");
const { getUserById } = require("../../models/Users/userModel")
const { getArticleById } = require("../../models/blog_articles/articleModel");

const register_comment = async (req, res) => {
  try {
    const { id_author, title, content, id_article, approved } = req.body; // Extrae los nuevos campos
    
    const user = await getUserById(id_author);
    if (!user) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    const acticles = await getArticleById(id_article);
    if (!acticles) {
        return res.status(400).json({ message: "article already exists" });
    }  
      
    const newOrderId = await createComment({
        id_author,
        title,
        content,
        id_article,
        approved
    }); // Pasa los nuevos campos al método createUser
    res.status(201).json({
      message: `Order registered successfully with id: ${newOrderId}`,
    });
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register_comment,
};
