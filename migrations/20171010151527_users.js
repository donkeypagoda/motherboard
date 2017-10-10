'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('hashed_password').notNullable();
    table.string('email').notNullable().unique();
    table.json('saved_boards').defaultTo([]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
