require('dotenv').config();
const express = require('express');
const app = express();

// Importar as rotas
const produtoRoutes = require('./routes/produtos');
const categoriaRoutes = require('./routes/categorias'); // Importe a rota de categorias

// Middleware para parsear JSON
app.use(express.json());

// Registrar as rotas
app.use('/api/produtos', produtoRoutes);
app.use('/api/categorias', categoriaRoutes); // Adicione a rota de categorias

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
