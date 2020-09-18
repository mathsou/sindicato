exports.up = function(knex) {
    return knex.schema.createTable('instrutores', function(table){
      table.increments('idInstrutor').primary();
      table.date('dataInicio').notNullable();
      
      table.integer('pessoasId').notNullable();
      table.foreign('pessoasId').references('idPessoa').inTable('pessoas').onDelete('CASCADE').onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('instrutores');
  };
  