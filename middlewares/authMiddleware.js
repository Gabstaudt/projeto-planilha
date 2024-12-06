const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
exports.verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ error: 'Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1]; // Extrair o token após "Bearer "

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // Adicionar os dados do usuário à requisição
        next();
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        return res.status(401).json({ error: 'Token inválido.' });
    }
};
