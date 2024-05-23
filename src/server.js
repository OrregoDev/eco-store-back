require('dotenv').config();
// const { pool : poolmysql } = require('./config/database');
const app = require('./app');

const port = process.env.PORT || 4000;

// // Prueba la conexión a la base de datos
// poolmysql.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Error al conectar a la base de datos:', err);
//     process.exit(1);
// //   } else {
//     console.log('Conexión a la base de datos exitosa:', res);
//   }
// });

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
