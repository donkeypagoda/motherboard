'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('Pb_config', (table) => {
    table.increments();
    table.integer('pedal_id').references('pedals.id').notNullable().onDelete('CASCADE');
    table.integer('board_id').references('boards.id').notNullable().onDelete('CASCADE');
    table.json('pedal_config').defaultTo({}).onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
