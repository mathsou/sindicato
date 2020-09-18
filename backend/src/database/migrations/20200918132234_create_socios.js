exports.up = function(knex) {
    return knex.schema.createTable('socios', function(table){
      table.integer('idSocio').primary();
      table.string('matricula').notNullable();
      table.string('socion', [1]).notNullable();
      table.string('nome').notNullable();
      table.date('dtNascimento');
      table.string('email');
      table.string('cidade');
      table.string('cep', [8]);
      table.string('celular');
      table.string('telComercial');
      table.string('telResidencial');
      table.string('localTrab');
      table.string('sexo', [1]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('socios');
  };
  