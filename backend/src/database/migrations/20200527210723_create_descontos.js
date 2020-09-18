exports.up = function(knex) {
    return knex.schema.createTable('descontos', function(table){
      table.increments('idDescontos').primary();
      table.string('tipo').notNullable();
      table.float('desconto').notNullable();
      table.string('VP', 1).notNullable();;
      
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('descontos');
  };
  