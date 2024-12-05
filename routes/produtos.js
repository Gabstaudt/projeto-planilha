const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Obter todos os produtos
router.get('/', produtoController.getAllProdutos);

// Criar um novo produto
router.post('/', produtoController.createProduto);

// Atualizar um produto
router.put('/:id', produtoController.updateProduto);

// Deletar um produto
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;
