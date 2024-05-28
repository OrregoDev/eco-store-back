// ORDERS
const {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require('../../models/Orders/orderModel');

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

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await updateOrder({ id, status });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json({
      message: `Estado del pedido actualizado exitosamente`,
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error en updateOrderStatus:', error);
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
  updateOrderStatus,
  deleteOrderItem,
};
