// PRODUCTS
const {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} = require('../../models/products/productModel');

const { pool: poolmysql } = require('../../config/database');

const searchProducts = async (req, res) => {
  try {
    const { name } = req.params;
    const products = await searchProduct(name);
    res.json(products);
  } catch (err) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const getAllProducts = async (req, res) => {
  try {
    const [rows, fields] = await poolmysql.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const getProductsByIdCategory = async (req, res) => {
  try {
    const { id_category } = req.body;
    const products = await getProductByIdCategory(id_category);
    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const registerProduct = async (req, res) => {
  try {
    const { name, price, quantity, image, id_category } = req.body;

    const product = await getProductByName(name);

    if (product) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    const newProductId = await createProduct({
      name,
      price,
      quantity,
      image,
      id_category,
    });

    if (!newProductId.id) {
      return res.status(404).json({ message: 'Error creating the product' });
    }

    res.status(201).json({
      message: `Product registered successfully with id: ${newProductId.id}`,
    });
  } catch (error) {
    console.error('Error in registerProduct:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    const product = await getProductById(id);

    if (!product) {
      return res.status(400).json({ message: 'Product does not exist' });
    }

    const affectedRows = await updateProduct({
      name,
      description,
      price,
      stock,
      category,
      id,
    });

    res.status(200).json({
      message: `Product details were successfully updated ${affectedRows}`,
    });
  } catch (err) {
    console.error('Error in updateProductDetails:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    if (!product) {
      return res.status(400).json({ message: 'Product does not exist' });
    }

    const affectedRows = await deleteProduct(id);

    res
      .status(200)
      .json({ message: `Product has been deleted: ${affectedRows}` });
  } catch (err) {
    console.error('Error in deleteProductDetails:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  registerProduct,
  updateProductDetails,
  deleteProductDetails,
  getAllProducts,
  getProductsByIdCategory,
  searchProducts,
};
