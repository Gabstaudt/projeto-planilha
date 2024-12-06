const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');

const Tarefa = sequelize.define('Tarefa', {
    tarefa_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    data_vencimento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('concluido', 'pendente'),
        allowNull: false,
    },
    usuario_origem_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    usuario_destino_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'tarefas',
    timestamps: false,
});

// Relacionamentos entre Tarefa e Usuario
Tarefa.belongsTo(Usuario, {
    as: 'usuario_origem',
    foreignKey: 'usuario_origem_id',
});

Tarefa.belongsTo(Usuario, {
    as: 'usuario_destino',
    foreignKey: 'usuario_destino_id',
});

module.exports = Tarefa;
