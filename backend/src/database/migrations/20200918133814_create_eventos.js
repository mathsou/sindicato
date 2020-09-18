exports.up = function(knex) {
    return knex.schema.createTable('eventos', function(table) {
        table.increments('idEvento').primary();
        table.string('evento').notNullable();

      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('eventos');
};