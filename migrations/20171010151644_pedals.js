'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('pedals', (table) => {
    table.increments();
    table.string('pedal_name').notNullable().unique();
    table.json('pedal_template');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pedals')
};
