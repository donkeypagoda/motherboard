const boards = [
  {
    id: 1,
    user_id: 1,
    board_name: "shredpocalypse"

  },
  {
    id: 2,
    user_id: 2,
    board_name: "spacefacefoogieboogie"
  }]


exports.seed = function(knex, Promise) {
  return knex('boards').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('boards_id_seq', 1, false);"
      );
    })
    .then(function () {
      return knex('boards').insert(boards);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('boards_id_seq', (SELECT MAX(id) FROM boards));"
      );
    });
};
