/**
 * Authors Table structure
 * @param {*} knex
 */
exports.up = (knex) => {
  return knex.schema.createTable('authors', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('books');
};
