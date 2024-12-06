const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tarefa = sequelize.define('Tarefa', {
    tarefa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    }
}, {
    tableName: 'tarefas',
    timestamps: false,
});

module.exports = Tarefa;
