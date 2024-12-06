const { Op } = require('sequelize');
const Usuario = require('../models/usuario');
const Tarefa = require('../models/tarefa');

// Método de login
exports.login = async (req, res) => {
    const { email, senha, nomeUsuario } = req.body;

    try {
        console.log('Tentando logar com:', req.body);

        // Construir o filtro de busca com os parâmetros disponíveis
        const whereCondition = {};
        if (email) {
            whereCondition.email = email;
        }
        if (nomeUsuario) {
            whereCondition.nomeUsuario = nomeUsuario;
        }

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

        // Login bem-sucedido
        const usuarioData = {
            usuario_id: usuario.usuario_id,
            nome: usuario.nome,
            nomeUsuario: usuario.nomeUsuario,
            email: usuario.email,
            nivel_acesso: usuario.nivel_acesso,
        };

        console.log('Login realizado com sucesso:', usuarioData);
        // Aqui removi a linha do localStorage porque ela não é válida no ambiente Node.js

        // Retornar os dados do usuário
        res.status(200).json({
            message: 'Login realizado com sucesso.',
            usuario: usuarioData,
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Função para listar tarefas atribuídas a um usuário específico
exports.listarTarefasPorUsuario = async (req, res) => {
    const { usuario } = req.query;

    try {
        console.log(`Buscando usuário com nome: ${usuario}`);
        const usuarioEncontrado = await Usuario.findOne({ where: { nome: usuario } });

        if (!usuarioEncontrado) {
            console.error(`Usuário com nome ${usuario} não encontrado.`);
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        console.log(`Usuário encontrado: ${usuarioEncontrado.nome}, ID: ${usuarioEncontrado.usuario_id}`);

        const tarefas = await Tarefa.findAll({
            where: { usuario_destino_id: usuarioEncontrado.usuario_id },
            include: [
                { model: Usuario, as: 'usuario_origem', attributes: ['nome'] },
            ]
        });

        if (tarefas.length === 0) {
            console.log('Nenhuma tarefa atribuída ao usuário.');
            return res.status(200).json({ message: 'Nenhuma tarefa atribuída ao usuário.' });
        }

        const tarefasComMensagem = tarefas.map(tarefa => ({
            id: tarefa.tarefa_id,
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
            data_vencimento: tarefa.data_vencimento,
            status: tarefa.status,
            enviadaPor: tarefa.usuario_origem ? tarefa.usuario_origem.nome : 'Desconhecido',
        }));

        res.status(200).json(tarefasComMensagem);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ error: 'Erro ao buscar tarefas.' });
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

