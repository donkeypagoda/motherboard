const pedals = [
  {
    id: 1,
    pedal_name: 'disto',
    pedal_template: '[150, 0.1, 60, 15000, true]'

  },
  {
    id: 2,
    pedal_name: 'chorus',
    pedal_template: '[50, 300, true]'
  },
  {
    id: 3,
    pedal_name: 'delay',
    pedal_template: '[0.25, 0.0, 0.5, true, true, true]'
  },
  {
    id: 4,
    pedal_name: 'reverb',
    pedal_template: '[0.7, 0.5, 125, 13000, true, true, "plate"]'
  },
  {
    id: 5,
    pedal_name: 'panner',
    pedal_template: '[125, true]'
  }]

exports.seed = function(knex, Promise) {
  return knex('pedals').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('pedals_id_seq', 1, false);"
      );
    })
    .then(function () {
      return knex('pedals').insert(pedals);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('pedals_id_seq', (SELECT MAX(id) FROM pedals));"
      );
    });
};
