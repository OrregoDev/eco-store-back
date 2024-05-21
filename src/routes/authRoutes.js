const express = require('express');
const {
  register,
  login,
  verifyToken,
} = require('../controllers/users/authController');

const {
  register_product
} = require('../controllers/products/authControllers')

const router = express.Router();

router.post('/login', login);
router.post('/register', register);         
router.post('/verify-token', verifyToken);
router.post('/register_product', register_product);


module.exports = router;
