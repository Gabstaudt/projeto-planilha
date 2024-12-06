require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importar cors para resolver problemas de CORS
const app = express();

app.use(cors());
app.use(express.json());

// Importar as rotas
const produtoRoutes = require('./routes/produtos');
const categoriaRoutes = require('./routes/categorias');
const movimentacaoRoutes = require('./routes/movimentacoes');
const planilhaRoutes = require('./routes/planilhas');
const authRoutes = require('./routes/auth'); // Importar rotas de autenticação
const tarefaRoutes = require('./routes/tarefas'); // Importar rotas de tarefas

// Registrar as rotas
app.use('/api/produtos', produtoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/movimentacoes', movimentacaoRoutes);
app.use('/api/planilhas', planilhaRoutes);
app.use('/api/auth', authRoutes); // Registrar rota de autenticação
app.use('/api/tarefas', tarefaRoutes); // Registrar rota de tarefas

// Importar as associações entre os modelos (relacionamentos)
require('./models/associacoes');

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
