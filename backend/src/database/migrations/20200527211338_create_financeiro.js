exports.up = function(knex) {
    return knex.schema.createTable('financeiro', function(table){
      table.increments('idFinanceiro').primary();
      
      table.float('valorPago').notNullable();
      table.integer('mesAno').notNullable();
      table.date('dataV').notNullable();
      table.date('dataP').notNullable();
      table.integer('praticaMId').notNullable();
      table.foreign('praticaMId').references('idPraticaM').inTable('praticaModalidade').onDelete('CASCADE').onUpdate('CASCADE');
    
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('financeiro');
  };
