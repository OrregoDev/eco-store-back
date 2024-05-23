const { createArticle } = require("../../models/blog_articles");

const register_order = async (req, res) => {
  try {
    const { id_user, product_id, payment_method, address } = req.body; // Extrae los nuevos campos

    
      
    const newOrderId = await createArticle({
      id_user,
      product_id,
      payment_method,
      address,
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
  register_order,
};
