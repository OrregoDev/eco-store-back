const express = require('express');
const {
  register,
  login,
  verifyToken,
  updateProfile,
  deleteProfile,
} = require('../controllers/users/authController');

const { register_product } = require('../controllers/products/authControllers');
const { register_order } = require('../controllers/orders/authControllers');

const router = express.Router();

router.post('/deleteProfile', deleteProfile);
router.post('/updateProfile', updateProfile);
router.post('/login', login);
router.post('/register', register);
router.post('/verify-token', verifyToken);
router.post('/register_product', register_product);
router.post('/register_order', register_order);

module.exports = router;
