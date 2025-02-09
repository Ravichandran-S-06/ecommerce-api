const express = require('express');
const { createOrder, getOrderHistory } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createOrder);
router.get('/history', authMiddleware, getOrderHistory);

module.exports = router;
