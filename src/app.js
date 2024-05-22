require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    console.log("getting here");
    res.send("root is working")
})

module.exports = app;
