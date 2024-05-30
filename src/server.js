require('dotenv').config();
const { pool } = require('./config/database');
const app = require('./app');

const port = process.env.PORT || 4000;

// Prueba la conexión a la base de datos
async function main() {

  try {
    const result = await pool.query('SELECT 1 + 2 as result');
    console.log({ result });
    console.log('Connected to the database.', result);
    app.listen(port, () => {
      console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });

  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  }
}
main()