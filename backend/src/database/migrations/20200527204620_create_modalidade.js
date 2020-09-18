exports.up = function(knex) {
    return knex.schema.createTable('modalidades', function(table){
      table.increments('idModalidade').primary();
      table.string('descricao').notNullable();
      table.float('valor').notNullable();
      table.date('dataCadastro').notNullable();
      table.date('dataAtualizacao').notNullable();
      
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('modalidades');
  };
  