// routes/tarefas.js
const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController'); // Importando o controlador correto

// Verificar se as funções do controller estão presentes
if (!tarefaController.adicionarTarefa || !tarefaController.listarTarefasPorUsuario) {
    console.error("Erro: Uma ou mais funções do tarefaController não foram encontradas.");
    throw new Error("Erro: Uma ou mais funções do tarefaController não foram encontradas.");
}

// Rota para adicionar uma nova tarefa
router.post('/adicionar', tarefaController.adicionarTarefa);

// Rota para listar tarefas atribuídas a um usuário específico
router.get('/listar/:usuario_id', tarefaController.listarTarefasPorUsuario); // Corrigi a rota para usar tarefaController e adicionei `/:usuario_id` para buscar as tarefas do usuário especificado

module.exports = router;
