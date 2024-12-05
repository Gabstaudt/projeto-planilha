const express = require('express');
const router = express.Router();
const planilhaController = require('../controllers/planilhaController');

// Endpoint para obter todos os produtos
router.get('/produtos', planilhaController.getProdutos);

// Endpoint para obter todas as categorias
router.get('/categorias', planilhaController.getCategorias);

// Endpoint para obter todas as movimentações
router.get('/movimentacoes', planilhaController.getMovimentacoes);

module.exports = router;
