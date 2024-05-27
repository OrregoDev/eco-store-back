// PRODUCTS
const{
  createProduct,
  getProductByName,
  getProductByIdCategory
} = require('../../models/products/productModel');
const { pool: poolmysql } = require('../../config/database');

const  getAllProducts = async (req, res) => {
  try {
    // Realizar la consulta a la base de datos
    const [rows, fields] = await poolmysql.query('SELECT * FROM products');
    // Enviar los resultados al frontend
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const getProductsByIdCategory = async (req ,res) =>{
  try {
    const {id_category} = req.body;

    const products = await getProductByIdCategory(id_category);

    res.json(products)

  } catch (error){
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error interno del servidor');
  }
} 

const register_product = async (req, res) => {
  try {
    const { name, price, quantity, image, id_category } = req.body; // Extrae los nuevos campos
    console.log({ id_category });

    const product = await getProductByName(name); // No cambia esta línea

    if (product) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    const newProductId = await createProduct({
      name,
      price,
      quantity,
      image,
      id_category,
    }); // Pasa los nuevos campos al método createUser
    res
      .status(201)
      .json({
        message: `Product registered successfully with id: ${newProductId}`,
      });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  register_product,
};

const updateProfile = async (req, res) => {
  try {
    const { name, price, quantity, image, id_category } = req.body;
    const { id } = req.params;
    if (!user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    const affectedRows = await updateUser({
      name,
      email,
      password: hashedPassword,
      last_name,
      number,
      address,
      city,
      country,
      rol_id,
      id,
    });
    res
      .status(201)
      .json({ message: `row was successfully updated ${affectedRows}` });
  } catch (err) {
    console.error("Error en register:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const affectedRows = await deleteUser(id);
    res
      .status(201)
      .json({ message: `The user has been deleted: ${affectedRows}` });
  } catch (err) {}
};


module.exports = {
  getAllProducts,
  register_product,
  updateProfile,
  updateProfile,
  deleteProfile,
  getProductsByIdCategory
};