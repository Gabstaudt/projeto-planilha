require('dotenv').config();
const express = require('express');
const app = express();
const produtoRoutes = require('./routes/produtos');

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/api/produtos', produtoRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
