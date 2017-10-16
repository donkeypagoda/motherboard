'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('pedals', (table) => {
    table.increments();
    table.string('pedalname').notNullable().unique();
    table.json('pedal_template').notNullable().defaultTo(JSON.stringify([]));
    table.integer('pedal_order');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
