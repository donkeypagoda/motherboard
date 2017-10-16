'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('Pb', (table) => {
    table.increments();
    table.integer('board_id').references('boards.id').notNullable().onDelete('CASCADE');
    table.integer('pedal_id').references('pedals.id').notNullable().onDelete('CASCADE');
    // table.integer('user_id').references('boards.id').notNullable().onDelete('CASCADE');
    table.json('pedal_config').notNullable().defaultTo(JSON.stringify([]));
    table.integer('pedal_order');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Pb')
};
