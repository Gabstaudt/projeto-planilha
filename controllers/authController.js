const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const Tarefa = require('../models/tarefa');

// Método de login
exports.login = async (req, res) => {
    const { email, senha, nomeUsuario } = req.body;

    try {
        console.log('Tentando logar com:', req.body);

        // Construir o filtro de busca com os parâmetros disponíveis
        const whereCondition = {
            [Op.or]: [
                { email: email || null },
                { nomeUsuario: nomeUsuario || null }
            ]
        };

        // Buscar usuário no banco de dados
        const usuario = await Usuario.findOne({ where: whereCondition });

        if (!usuario) {
            console.log('Usuário não encontrado.');
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verificar senha (sem bcrypt por enquanto)
        if (usuario.senha !== senha) {
            console.log('Senha incorreta.');
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        // Login bem-sucedido, gerar token JWT
        const usuarioData = {
            usuario_id: usuario.usuario_id,
            nome: usuario.nome,
            nomeUsuario: usuario.nomeUsuario,
            email: usuario.email,
            nivel_acesso: usuario.nivel_acesso,
        };

        // Gera o token JWT com uma validade de 1 hora
        const token = jwt.sign(usuarioData, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Login realizado com sucesso:', usuarioData);

        // Retornar os dados do usuário junto com o token
        res.status(200).json({
            message: 'Login realizado com sucesso.',
            usuario: usuarioData,
            token: token,
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Método para criar um novo usuário
exports.criarUsuario = async (req, res) => {
    const { nome, nomeUsuario, email, senha, nivel_acesso } = req.body;

    try {
        if (!nomeUsuario) {
            return res.status(400).json({ error: 'O campo nomeUsuario é obrigatório.' });
        }

        // Verificar se o email ou nomeUsuario já existe
        const usuarioExistente = await Usuario.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { nomeUsuario }
                ]
            }
        });

        if (usuarioExistente) {
            return res.status(409).json({ error: 'Email ou nome de usuário já cadastrado.' });
        }

        // Criar novo usuário
        const novoUsuario = await Usuario.create({
            nome,
            nomeUsuario,
            email,
            senha,
            nivel_acesso
        });

        res.status(201).json({
            message: 'Usuário criado com sucesso.',
            usuario: {
                usuario_id: novoUsuario.usuario_id,
                nome: novoUsuario.nome,
                nomeUsuario: novoUsuario.nomeUsuario,
                email: novoUsuario.email,
                nivel_acesso: novoUsuario.nivel_acesso,
            }
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};
