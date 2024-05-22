// ORDERS
const { createOrder } = require('../../models/orders/orderModel');

const register_order = async (req, res) => {
  try {
    const { id_user, product_id, payment_method, adress } = req.body; // Extrae los nuevos campos

    const newOrderId = await createOrder({
      id_user,
      product_id,
      payment_method,
      adress,
    }); // Pasa los nuevos campos al método createUser
    res.status(201).json({
      message: `Order registered successfully with id: ${newOrderId}`,
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  register_order,
};
