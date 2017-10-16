//hashed passwords were created using a WF of 12

const users = [
  {
    'username': 'puppy',
    'email': 'puppy@gmail.com',
    'hashed_password': '$2a$12$TA.bTNRPjuJv3mXi6J5bc.Z.MWwruZ5UnhtTWQ2toOMFIa181TKOK'
  }, {
    'username': 'kitty',
    'email': 'kitty@gmail.com',
    'hashed_password': '$2a$12$xB0v3BVdGGW1N8cMkMR6OOIBn7Yehl61Wos9SND7BPtOuCfjOD2JC'
  }
];

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', 1, false);"
      )
    })
    .then(() => {
      return knex('users').insert(users);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
