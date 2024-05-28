// PRODUCTS
const {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../../models/Products/productModel');

const registerProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const product = await getProductByName(name);

    if (product) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    const newProductId = await createProduct({
      name,
      description,
      price,
      stock,
      category,
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
};
