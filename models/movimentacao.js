const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Movimentacao = sequelize.define('Movimentacao', {
  movimentacao_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.ENUM('entrada', 'saida'),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_movimentacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Movimentacoes',
  timestamps: false,
});

module.exports = Movimentacao;
