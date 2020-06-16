exports.up = (knex) => {
  return knex.schema.createTable('books', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description');
    table
      .integer('author_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('authors')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.json('categories');
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('books');
};
