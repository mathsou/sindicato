exports.up = function(knex) {
    return knex.schema.createTable('agendamentos', function(table){
      table.integer('idAgend').primary();
      table.string('socioId').notNullable();
      table.datetime('dataHoraInicial', {precision: 6}).notNullable();
      table.datetime('dataHoraFinal', {precision: 6}).notNullable();
      table.string('observacao');
      table.float('valor').notNullable();
      table.integer('eventoId').notNullable();

      table.foreign('eventoId').references('idEvento').inTable('eventos').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('socioId').references('idSocio').inTable('socios').onDelete('CASCADE').onUpdate('CASCADE');
      
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('agendamentos');
  };
  