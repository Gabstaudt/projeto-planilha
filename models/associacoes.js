const Usuario = require('./usuario');
const Tarefa = require('./tarefa');

// Definindo as associações entre Usuario e Tarefa
Tarefa.belongsTo(Usuario, { foreignKey: 'usuario_origem_id', as: 'usuarioCriador' });
Tarefa.belongsTo(Usuario, { foreignKey: 'usuario_destino_id', as: 'usuarioResponsavel' });

Usuario.hasMany(Tarefa, { foreignKey: 'usuario_origem_id', as: 'tarefasCriadas' });
Usuario.hasMany(Tarefa, { foreignKey: 'usuario_destino_id', as: 'tarefasResponsavel' });

module.exports = {
    Usuario,
    Tarefa
};
