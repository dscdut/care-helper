/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('doctors')
    .del()
    .then(() => knex('doctors').insert([
        {
            id: 1,
            full_name: 'Doctor 1',
            email: 'doctor1@gmail.com',
            phone: '22222222',
        },
        {
            id: 2,
            full_name: 'Doctor 2',
            email: 'doctor2@gmail.com',
            phone: '33333333',
        },
    ]));
