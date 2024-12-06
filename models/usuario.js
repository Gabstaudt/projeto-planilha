const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    usuario_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    nomeUsuario: {
        type: DataTypes.STRING(45),
        allowNull: false, // Este campo é obrigatório
        unique: true      // Deve ser único para cada usuário
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    nivel_acesso: {
        type: DataTypes.ENUM('func', 'admin'),
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;
