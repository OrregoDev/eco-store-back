// PRODUCTS

const {
  createProduct,
  getProductByName,
} = require('../../models/products/productModel');

const register = async (req, res) => {
  try {
    const { name, price, quantity, image, id_category } = req.body; // Extrae los nuevos campos
    console.log({ id_category });

    const product = await getProductByName(name); // No cambia esta línea

    if (name) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    const newProductId = await createProduct({
      name,
      price,
      quantity,
      image,
      id_category,
    }); // Pasa los nuevos campos al método createUser
    res
      .status(201)
      .json({
        message: `Product registered successfully with id: ${newProductId}`,
      });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  register,
};
