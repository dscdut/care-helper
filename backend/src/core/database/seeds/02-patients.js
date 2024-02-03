/**
 * @param {import("knex")} knex
 */

exports.seed = knex =>
    knex('patients')
        .del()
        .then(() =>
            knex('patients').insert([
                {
                    id: 1,
                    full_name: 'Patient 1',
                    phone: '00000000',
                },
                {
                    id: 2,
                    full_name: 'Patient 2',
                    phone: '1111111',
                },
            ]),
        );
