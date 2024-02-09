/**
 * @param {import("knex")} knex
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { fakerVI } from '@faker-js/faker';
import { numPatients } from './02-patients';

const tableName = 'medical_histories';

exports.seed = async knex => {
    await knex(tableName).del();

    const data = [];

    for (let i = 1; i <= numPatients; i += 1) {
        const item = {
            history: fakerVI.lorem.sentence({ max: 100 }),
            patient_id: i,
        };

        data.push(item);
    }
    await knex(tableName).insert(data);
};
