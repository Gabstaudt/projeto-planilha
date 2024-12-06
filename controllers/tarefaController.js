const Usuario = require('../models/usuario');
const Tarefa = require('../models/tarefa');

// Função para adicionar uma tarefa
exports.adicionarTarefa = async (req, res) => {
    const { titulo, descricao, nomeUsuario } = req.body;

    try {
        // Procurar pelo usuário no banco de dados pelo nome
        const usuario = await Usuario.findOne({ where: { nome: nomeUsuario } });

        if (!usuario) {
            console.error(`Usuário com nome ${nomeUsuario} não encontrado.`);
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        console.log(`Usuário encontrado: ${usuario.nome}, ID: ${usuario.usuario_id}`);

        // Criar a tarefa e associar ao usuário destino
        const tarefa = await Tarefa.create({
            titulo,
            descricao,
            usuario_origem_id: usuario.usuario_id,
            usuario_destino_id: usuario.usuario_id
        });

        console.log('Tarefa criada com sucesso:', tarefa);

        res.status(201).json({ message: 'Tarefa adicionada com sucesso.', tarefa });
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        res.status(500).json({ error: 'Erro ao adicionar tarefa.' });
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
                { model: Usuario, as: 'usuarioCriador' },
                { model: Usuario, as: 'usuarioResponsavel' }
            ]
        });

        if (tarefas.length === 0) {
            console.log('Nenhuma tarefa atribuída ao usuário.');
            return res.status(200).json({ message: 'Nenhuma tarefa atribuída ao usuário.' });
        }

        res.status(200).json(tarefas);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ error: 'Erro ao buscar tarefas.' });
    }
};
