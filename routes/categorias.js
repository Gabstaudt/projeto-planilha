const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria');

// Obter todas as categorias
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias.' });
  }
});

// Criar uma nova categoria
router.post('/', async (req, res) => {
  try {
    const novaCategoria = await Categoria.create(req.body);
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(500).json({ error: `Erro ao criar categoria: ${error.message}` });
  }
});

// Atualizar uma categoria existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Categoria.update(req.body, { where: { categoria_id: id } });
    if (updated) {
      const updatedCategoria = await Categoria.findOne({ where: { categoria_id: id } });
      res.json(updatedCategoria);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: `Erro ao atualizar categoria: ${error.message}` });
  }
});

// Deletar uma categoria existente
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Categoria.destroy({ where: { categoria_id: id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Categoria não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: `Erro ao excluir categoria: ${error.message}` });
  }
});

module.exports = router;
