require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importar cors para resolver problemas de CORS
const app = express();

// Usar middleware CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Importar as rotas
const produtoRoutes = require('./routes/produtos');
const categoriaRoutes = require('./routes/categorias');
const movimentacaoRoutes = require('./routes/movimentacoes');
const planilhaRoutes = require('./routes/planilhas'); // Importar rotas de planilhas

// Registrar as rotas
app.use('/api/produtos', produtoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/movimentacoes', movimentacaoRoutes);
app.use('/api/planilhas', planilhaRoutes); // Registrar rotas de planilhas

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
