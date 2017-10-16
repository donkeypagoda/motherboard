const Pbs = [
  {
    id: 1,
    board_id: 1,
    pedal_id: 1,
    pedal_config: JSON.stringify([150, 0.1, 60, 15000, true]),
    pedal_order: 1
  },
  {
    id: 2,
    board_id: 1,
    pedal_id: 3,
    pedal_config: JSON.stringify([0.25, 0.0, 0.5, true, true, true]),
    pedal_order: 2
  },
  {
    id: 3,
    board_id: 2,
    pedal_id: 1,
    pedal_config: JSON.stringify([150, 0.1, 60, 15000, true]),
    pedal_order: 1
  },
  {
    id: 4,
    board_id: 2,
    pedal_id: 2,
    pedal_config: JSON.stringify([50, 300, true]),
    pedal_order: 2
  },
  {
    id: 5,
    board_id: 2,
    pedal_id: 5,
    pedal_config: JSON.stringify([125, true]),
    pedal_order: 3
  }]
exports.seed = function(knex, Promise) {
  return knex('Pb').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('Pb_id_seq', 1, false);"
      )
    })
    .then(function () {
      return knex('Pb').insert(Pbs);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('Pb_id_seq', (SELECT MAX(id) FROM Pb));"
      );
    });
};
