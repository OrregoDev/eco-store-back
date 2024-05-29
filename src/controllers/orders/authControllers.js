// ORDERS
const {
  createOrder,
  getOrderById,
  deleteOrder,
} = require('../../models/orders/orderModel');

const createOrderItem = async (req, res) => {
  try {
    const { id_user, product_id, payment_method, address } = req.body;

    const order = await createOrder({
      id_user,
      product_id,
      payment_method,
      address,
    });

    if (!order.id) {
      return res.status(404).json({ message: 'Error al crear el pedido' });
    }

    res
      .status(201)
      .json({ message: `Pedido registrado exitosamente con id: ${order.id}` });
  } catch (error) {
    console.error('Error en createOrderItem:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);

    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error en getOrderDetails:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const updateOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_user, product_id, payment_method, address } = req.body;

    const order = await getOrderById(id);

    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    // Preparar los cambios a aplicar
    const changes = {};
    if (id_user) changes.userId = id_user;
    if (product_id) changes.items = [{ productId: product_id }];
    if (payment_method) changes.paymentMethod = payment_method;
    if (address) changes.deliveryAddress = address;

    // Actualizar el pedido con los cambios
    const updatedOrder = await Order.updateOne({ _id: id }, { $set: changes });

    if (!updatedOrder.matchedCount) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json({
      message: `Detalles del pedido actualizados exitosamente`,
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error en updateOrderDetails:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await deleteOrder(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json({ message: `Pedido eliminado exitosamente` });
  } catch (error) {
    console.error('Error en deleteOrderItem:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  createOrderItem,
  getOrderDetails,
  deleteOrderItem,
  updateOrderDetails,
};
