const Produto = require('../models/produto');
const Categoria = require('../models/categoria');
const Movimentacao = require('../models/movimentacao');

// Função para obter todos os produtos
exports.getProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
};

// Função para obter todas as categorias
exports.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar categorias.' });
    }
};

// Função para obter todas as movimentações
exports.getMovimentacoes = async (req, res) => {
    try {
        const movimentacoes = await Movimentacao.findAll();
        res.json(movimentacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar movimentações.' });
    }
};
