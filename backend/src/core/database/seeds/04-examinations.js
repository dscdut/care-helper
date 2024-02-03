/**
 * @param {import("knex")} knex
 */

/**
 * @param {import("knex")} knex
 */
import { numPatients } from './02-patients';
import { numDoctors } from './02-doctors';
import { numHospitals } from './03-hospitals';
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

const tableName = 'examinations';
export const numExaminations= 10;// You can adjust the number of examinations you want to create
exports.seed = async knex => {
    await knex(tableName).del();

    const examinations = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= numExaminations; i++) {
        const examination = {
            diagnose: faker.lorem.words(),
            detail_diagnose: faker.lorem.sentence(),
            advice: faker.lorem.sentence(),
            doctor_id: faker.random.number({ min: 1, max: numDoctors }),
            patient_id: faker.random.number({ min: 1, max: numPatients }),
            hospital_id: faker.random.number({ min: 1, max: numHospitals }),
        };

        examinations.push(examination);
    }

    await knex(tableName).insert(examinations);
};

