
exports.up = function(knex) {
    return knex.schema.table('agendamentos', function(table) {
        table.string('descricao');
    });
};

exports.down = function(knex) {
    return knex.schema.table('agendamentos', function(table) {
        table.dropColumn('descricao');
    });
};
