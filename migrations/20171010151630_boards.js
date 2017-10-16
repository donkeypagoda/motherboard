'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('boards', (table) => {
    table.increments();
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');
    table.string('board_name').notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('boards')
};
