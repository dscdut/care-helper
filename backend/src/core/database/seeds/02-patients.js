/**
 * @param {import("knex")} knex
 */

exports.seed = knex =>
    knex('patients')
        .del()
        .then(() =>
            knex('patients').insert([
                {
                    user_id: 3,
                },
                {
                    user_id: 4,
                },
            ]),
        );
