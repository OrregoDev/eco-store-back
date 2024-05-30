const express = require('express');
const {
  register,
  login,
  verifyToken,
  updateProfile,
  deleteProfile,
} = require('../controllers/users/usersController');

const {
  registerProduct,
  getAllProducts,
  getProductsByIdCategory,
  searchProducts,
} = require('../controllers/products/productsControllers');
const { createOrderItem } = require('../controllers/orders/ordersControllers');
const { register_Article } = require('../controllers/blog_articles/articlesControllers');

const router = express.Router();

router.delete('/delete-profile/:id', deleteProfile);
router.patch('/update-profile/:id', updateProfile);
router.post('/login', login);
router.post('/register', register);
router.post('/verify-token', verifyToken);
router.post('/register-product', registerProduct);
router.post('/register-order', createOrderItem);
router.get('/get-products', getAllProducts);
router.get('/get-product-by-id-category', getProductsByIdCategory);
router.get('/search-products/:name', searchProducts);
router.post('/register-artlicles', register_Article)

// router.get('/products');
// router.get('/products/:id');
// router.post('/products');
// router.put('/products/:id');
// router.delete('/products/:id');
// router.patch('/products/:id');

// router.get('/categories');

module.exports = router;
