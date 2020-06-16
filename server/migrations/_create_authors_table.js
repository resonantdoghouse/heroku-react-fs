/**
 * Authors Table structure
 * @param {*} knex
 */
exports.up = (knex) => {
  return knex.schema.createTable('authors', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.integer('age');
    table.string('bio');
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('authors');
};
