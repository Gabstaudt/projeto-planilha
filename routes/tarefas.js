const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importando o middleware de autenticação

// Rota para adicionar uma nova tarefa, protegida pelo middleware de autenticação
router.post('/adicionar', authMiddleware.verificarToken, tarefaController.adicionarTarefa);

// Rota para listar tarefas atribuídas a um usuário específico
router.get('/listar/:usuario_id', tarefaController.listarTarefasPorUsuario);

// Rota para concluir (apagar) uma tarefa específica
router.delete('/concluir/:tarefa_id', tarefaController.concluirTarefa);

module.exports = router;
