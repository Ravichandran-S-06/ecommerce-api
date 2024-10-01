const Order = require('../models/Order');
const Cart = require('../models/cart');

const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    const order = new Order({ userId: req.user.id, items: cart.items });
    await order.save();

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order history' });
  }
};

module.exports = { createOrder, getOrderHistory };
