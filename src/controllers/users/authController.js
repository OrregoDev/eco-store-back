// USERS

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../../models/Users/userModel');

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      lastName,
      number,
      address,
      city,
      country,
      roleId,
    } = req.body; // Extrae los nuevos campos
    console.log({ roleId });

    const user = await getUserByEmail(email); // No cambia esta línea

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUserId = await createUser({
      name,
      email,
      password,
      last_name: lastName,
      number,
      address,
      city,
      country,
      rol_id: roleId,
    }); // Pasa los nuevos campos al método createUser
    res
      .status(201)
      .json({ message: `User registered successfully with id: ${newUserId}` });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
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
    const isMatch = await bcrypt.compare(password, user.password);
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
      user: { id: user.id, username: user.username, email: user.email },
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
};
