exports.up = function(knex) {
    return knex.schema.createTable('praticaModalidades', function(table){
      table.increments('idPraticaM').primary();
      
      table.integer('alunoId').notNullable();
      table.integer('modalidadeId').notNullable();
      table.integer('descontoId');
      table.foreign('alunoId').references('idAluno').inTable('alunos').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('modalidadeId').references('idModalidade').inTable('modalidades').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('descontoId').references('idDesconto').inTable('descontos').onDelete('CASCADE').onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('praticaModalidades');
  };
