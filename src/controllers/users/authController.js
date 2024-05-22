// USERS
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  getUserByEmail,
  updateUser,
  deleteUser,
} = require('../../models/Users/userModel');

const { createUser } = require('../../models/Users/userModel')

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      last_name,
      number,
      address,
      city,
      country,
      rol_id,
    } = req.body; // Extrae los nuevos campos

    const user = await getUserByEmail(email); // No cambia esta línea

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    const newUserId = await createUser({
      name,
      email,
      password: hashedPassword,
      last_name,
      number,
      address,
      city,
      country,
      rol_id,
    }); // Pasa los nuevos campos al método createUser
    if(!newUserId) {
      return res.status(404).json({ message: 'Error al crear el usuario' });
    }
    res
      .status(201)
      .json({ message: `User registered successfully with id: ${newUserId}` });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      last_name,
      number,
      address,
      city,
      country,
      rol_id,
    } = req.body;
    const { id } = req.params;
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
    console.error('Error en register:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await deleteUser(id);
    res
      .status(201)
      .json({ message: `The user has been deleted: ${affectedRows}` });
  } catch (err) {}
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Verificar si el usuario existe
    const user = await getUserByEmail(email);
    console.log(email, user);
    if (!user) {
      console.log('Usuario no existe');
      return res.status(400).json({ message: 'Ese Usuario no existe' });
    }
    // Comparar contraseñas
    console.log('Contraseña ingresada:', password);
    console.log('Contraseña almacenada (hasheada):', user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: { id: user.id, username: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const verifyToken = (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token no proporcionado', valid: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch (err) {
    // Check is instance of TokenExpiredError
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado', valid: false });
    }
    // Check if instance of JsonWebTokenError
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido', valid: false });
    }

    // Check if instance of Error
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ message: 'Error en el servidor', valid: false });
    }
  }
};

module.exports = {
  register,
  login,
  verifyToken,
  updateProfile,
  deleteProfile,
};
