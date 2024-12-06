const Usuario = require('../models/usuario');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Buscar usuário no banco de dados
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verificar senha (sem bcrypt por enquanto)
        if (usuario.senha !== senha) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        // Login bem-sucedido, retornar os dados do usuário
        res.status(200).json({
            message: 'Login realizado com sucesso.',
            usuario: {
                usuario_id: usuario.usuario_id,
                nome: usuario.nome,
                email: usuario.email,
                nivel_acesso: usuario.nivel_acesso,
            },
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro ao realizar login.' });
    }
};
