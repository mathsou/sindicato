exports.up = function(knex) {
    return knex.schema.createTable('objetivos', function(table){
      table.increments('idObjetivos').primary();
      table.string('objetivo').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('objetivos');
  };
  