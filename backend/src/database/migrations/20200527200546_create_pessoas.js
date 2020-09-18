exports.up = function(knex) {
  return knex.schema.createTable('pessoas', function(table){
    table.integer('idPessoa').primary();
    table.string('nome').notNullable();
    table.date('dataNascimento').notNullable();
    table.integer('telefone').notNullable();
    table.string('foto').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pessoas');
};
