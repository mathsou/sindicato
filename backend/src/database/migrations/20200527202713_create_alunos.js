exports.up = function(knex) {
    return knex.schema.createTable('alunos', function(table){
      table.increments('idAluno').primary();
      table.date('dataIngresso').notNullable();
      table.string('observacao');
      
      table.integer('pessoaId').notNullable();
      table.integer('titularId');
      table.foreign('titularId').references('idAluno').inTable('alunos').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('pessoaId').references('idPessoa').inTable('pessoas').onDelete('CASCADE').onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('alunos');
  };
  