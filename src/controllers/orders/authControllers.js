// ORDERS
const { createOrder } = require('../../models/orders/orderModel');

const register_order = async (req, res) => {
  try {
    const { id_user, product_id, payment_method, adress } = req.body; // Extrae los nuevos campos

    const product = await getProductByName(); // No cambia esta línea

    if (product) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    const newProductId = await createProduct({
      name,
      price,
      quantity,
      image,
      id_category,
    }); // Pasa los nuevos campos al método createUser
    res.status(201).json({
      message: `Product registered successfully with id: ${newProductId}`,
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  register_product,
};
