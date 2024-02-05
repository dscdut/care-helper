/**
 * @param {import("knex")} knex
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { fakerVI } from '@faker-js/faker';
import { numPatients } from './02-patients';
import { numDoctors } from './02-doctors';
import { numHospitals } from './03-hospitals';

const tableName = 'examinations';
export const numExaminations = 50;// You can adjust the number of examinations you want to create
exports.seed = async knex => {
    await knex(tableName).del();

    const examinations = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= numExaminations; i++) {
        const examination = {
            diagnose: fakerVI.lorem.words({ max: 10 }),
            detail_diagnose: fakerVI.lorem.lines({ max: 5 }),
            advice: fakerVI.lorem.lines({ max: 10 }),
            doctor_id: fakerVI.number.int({ min: 1, max: numDoctors }),
            patient_id: fakerVI.number.int({ min: 1, max: numPatients }),
            hospital_id: fakerVI.number.int({ min: 1, max: numHospitals }),
            created_at: fakerVI.date.past({ years: 11 }),
        };

        examinations.push(examination);
    }
    examinations.push({
        diagnose: 'Thiếu người yêu',
        detail_diagnose:
            'Cô đơn quá lâu dẫn đến suy tim, trầm cảm nặng, lạnh lẽo vào mùa đông',
        advice: 'Kiếm người yêu đi',
        doctor_id: fakerVI.number.int({ min: 1, max: numDoctors }),
        patient_id: fakerVI.number.int({ min: 1, max: numPatients }),
        hospital_id: fakerVI.number.int({ min: 1, max: numHospitals }),
    });
    await knex(tableName).insert(examinations);
};
