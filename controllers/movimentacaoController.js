const Movimentacao = require('../models/movimentacao');

// Criar uma nova movimentação
exports.createMovimentacao = async (req, res) => {
  try {
    const movimentacao = await Movimentacao.create(req.body);
    res.status(201).json(movimentacao);
  } catch (error) {
    res.status(500).json({ error: `Erro ao criar movimentação: ${error.message}` });
  }
};

// Obter todas as movimentações
exports.getAllMovimentacoes = async (req, res) => {
  try {
    const movimentacoes = await Movimentacao.findAll();
    res.json(movimentacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar movimentações.' });
  }
};

// Atualizar uma movimentação
exports.updateMovimentacao = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Movimentacao.update(req.body, { where: { movimentacao_id: id } });
    if (updated) {
      const updatedMovimentacao = await Movimentacao.findOne({ where: { movimentacao_id: id } });
      res.json(updatedMovimentacao);
    } else {
      res.status(404).json({ error: 'Movimentação não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: `Erro ao atualizar movimentação: ${error.message}` });
  }
};

// Deletar uma movimentação
exports.deleteMovimentacao = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Movimentacao.destroy({ where: { movimentacao_id: id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Movimentação não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: `Erro ao excluir movimentação: ${error.message}` });
  }
};
