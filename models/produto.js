const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  produto_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  fornecedor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  codigo_produto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Produtos',
  timestamps: false,
});

module.exports = Produto;
