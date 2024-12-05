const express = require('express');
const router = express.Router();
const Produto = require('../models/index');

// Obter todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

// Criar um novo produto
router.post('/', async (req, res) => {
    try {
      const novoProduto = await Produto.create(req.body);
      res.status(201).json(novoProduto);
    } catch (error) {
      console.error(error); // Adiciona esta linha para imprimir o erro no console
      res.status(500).json({ error: `Erro ao criar produto: ${error.message}` }); // Exibe o detalhe do erro
    }
  });

module.exports = router;
