exports.up = function(knex) {
    return knex.schema.createTable('instruiModalidades', function(table){
      table.increments('idInstruiM').primary();
      
      table.integer('instrutorId').notNullable();
      table.integer('modalidadeId').notNullable();
      table.foreign('instrutorId').references('idInstrutor').inTable('instrutores').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('modalidadeId').references('idModalidade').inTable('modalidades').onDelete('CASCADE').onUpdate('CASCADE');
      
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('instruiModalidades');
  };
