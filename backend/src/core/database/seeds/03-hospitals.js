/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('hospitals')
    .del()
    .then(() => knex('hospitals').insert([
        {
            id: 1,
            name: 'BV Bach Mai',
            address: 'Ha Noi',
        },
    ]));
