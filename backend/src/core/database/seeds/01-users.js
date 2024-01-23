/**
 * @param {import("knex")} knex
 */

exports.seed = knex =>
    knex('users')
        .del()
        .then(() =>
            knex('users').insert([
                {
                    full_name: 'Doctor 1',
                    email: 'doctor1@gmail.com',
                    phone: '22222222',
                    type: 'doctor',
                },
                {
                    full_name: 'Doctor 2',
                    email: 'doctor2@gmail.com',
                    type: 'doctor',
                    phone: '33333333',
                },
                {
                    full_name: 'User 1',
                    phone: '00000000',
                    type: 'patient',
                },
                {
                    full_name: 'User 2',
                    phone: '1111111',
                    type: 'patient',
                },
            ]),
        );
