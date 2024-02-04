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
export const numExaminations = 10; // You can adjust the number of examinations you want to create
exports.seed = async knex => {
    await knex(tableName).del();

    const examinations = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= numExaminations; i++) {
        const examination = {
            diagnose: faker.lorem.words(),
            detail_diagnose: faker.lorem.sentence(),
            advice: faker.lorem.sentence(),
            doctor_id: faker.datatype.number({ min: 1, max: numDoctors }),
            patient_id: faker.datatype.number({ min: 1, max: numPatients }),
            hospital_id: faker.datatype.number({ min: 1, max: numHospitals }),
        };

        examinations.push(examination);
    }
    examinations.push({
        diagnose: 'Thiếu người yêu',
        detail_diagnose:
            'Cô đơn quá lâu dẫn đến suy tim, trầm cảm nặng, lạnh lẽo vào mùa đông',
        advice: 'Kiếm người yêu đi',
        doctor_id: faker.datatype.number({ min: 1, max: numDoctors }),
        patient_id: faker.datatype.number({ min: 1, max: numPatients }),
        hospital_id: faker.datatype.number({ min: 1, max: numHospitals }),
    });
    await knex(tableName).insert(examinations);
};
