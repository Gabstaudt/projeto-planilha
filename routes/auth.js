const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de login
router.post('/login', authController.login);

// Rota para criar um novo usuário
router.post('/usuarios', authController.criarUsuario);

module.exports = router;
