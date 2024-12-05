const Produto = require('../models/produto');

exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
};

exports.createProduto = async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body);
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ error: `Erro ao criar produto: ${error.message}` });
  }
};

exports.updateProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Produto.update(req.body, { where: { produto_id: id } });
    if (updated) {
      const updatedProduto = await Produto.findOne({ where: { produto_id: id } });
      res.json(updatedProduto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: `Erro ao atualizar produto: ${error.message}` });
  }
};

exports.deleteProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Produto.destroy({ where: { produto_id: id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Produto não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: `Erro ao excluir produto: ${error.message}` });
  }
};
