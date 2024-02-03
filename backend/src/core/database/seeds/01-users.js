/**
 * @param {import("knex")} knex
 */

import { Role } from '../../common/enum';

exports.seed = knex =>
    knex('users')
        .del()
        .then(() =>
            knex('users').insert([
                {
                    full_name: 'Doctor 1',
                    email: 'doctor1@gmail.com',
                    phone: '22222222',
                    role: Role.DOCTOR,
                },
                {
                    full_name: 'Doctor 2',
                    email: 'doctor2@gmail.com',
                    role: Role.DOCTOR,
                    phone: '33333333',
                },
                {
                    full_name: 'Patient 1',
                    phone: '00000000',
                    role: Role.PATIENT,
                },
                {
                    full_name: 'Patient 2',
                    phone: '1111111',
                    role: Role.PATIENT,
                },
            ]),
        );
