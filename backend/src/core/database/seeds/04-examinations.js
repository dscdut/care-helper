/**
 * @param {import("knex")} knex
 */

exports.seed = knex =>
    knex('examinations')
        .del()
        .then(() =>
            knex('examinations').insert([
                {
                    diagnose: 'Huyet ap cao',
                    advice: 'Nghi ngoi',
                    doctor_id: 1,
                    patient_id: 1,
                    hospital_id: 1,
                },
            ]),
        );
