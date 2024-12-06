const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

// Verificar se as funções do controller estão presentes
if (!tarefaController.adicionarTarefa || !tarefaController.listarTarefasPorUsuario) {
    console.error("Erro: Uma ou mais funções do tarefaController não foram encontradas.");
    throw new Error("Erro: Uma ou mais funções do tarefaController não foram encontradas.");
}

// Rota para adicionar uma nova tarefa
router.post('/adicionar', tarefaController.adicionarTarefa);

// Rota para listar tarefas atribuídas a um usuário
router.get('/', tarefaController.listarTarefasPorUsuario);

module.exports = router;
