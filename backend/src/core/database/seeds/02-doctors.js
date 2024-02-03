/**
 * @param {import("knex")} knex
 */

exports.seed = knex =>
    knex('doctors')
        .del()
        .then(() =>
            knex('doctors').insert([
                {
                    user_id: 1,
                },
                {
                    user_id: 2,
                },
            ]),
        );
