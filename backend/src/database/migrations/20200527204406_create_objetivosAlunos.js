exports.up = function(knex) {
    return knex.schema.createTable('objetivoAluno', function(table){
      table.increments('idObjetivoAluno').primary();
      
      table.integer('alunoId').notNullable();
      table.integer('objetivoId').notNullable();
      table.foreign('alunoId').references('idAluno').inTable('alunos').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('objetivoId').references('idObjetivo').inTable('objetivos').onDelete('CASCADE').onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('objetivoAluno');
  };
  