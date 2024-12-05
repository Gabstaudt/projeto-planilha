const express = require('express');
const router = express.Router();
const movimentacaoController = require('../controllers/movimentacaoController');

// Criar uma nova movimentação (POST)
router.post('/', movimentacaoController.createMovimentacao);

// Obter todas as movimentações (GET)
router.get('/', movimentacaoController.getAllMovimentacoes);

// Atualizar uma movimentação (PUT)
router.put('/:id', movimentacaoController.updateMovimentacao);

// Deletar uma movimentação (DELETE)
router.delete('/:id', movimentacaoController.deleteMovimentacao);

module.exports = router;
