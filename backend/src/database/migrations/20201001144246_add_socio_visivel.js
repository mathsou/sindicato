exports.up = function(knex) {
    return knex.schema.alterTable('socios', function(table) {
        table.boolean('visivel').notNullable().defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.table('socios', function(table){
        table.dropColumn('visivel');
    });
};
