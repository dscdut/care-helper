/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import { fakerVI } from '@faker-js/faker';
import { promises as fsPromises } from 'fs';
import { numExaminations } from './04-examinations';

const drugsFilePath = '../database/researchData/drugs.json';

const readJsonFile = async filePath => {
    try {
        const data = await fsPromises.readFile(filePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};
const tableName = 'prescriptions';
const numPrescriptions = 45; // Adjust the number of prescriptions you want to generate

exports.seed = async knex => {
    await knex(tableName).del();
    const drugsList = await readJsonFile(drugsFilePath);

    const prescriptions = Array.from({ length: numPrescriptions }, () => {
        const startDate = fakerVI.date.between(
            fakerVI.date.future(),
            fakerVI.date.past(),
        );
        const endDate = fakerVI.date.between(startDate, startDate + 90);
        return {
            startDate,
            endDate,
            details: JSON.stringify(
                fakerVI.helpers
                    .arrayElements(drugsList)
                    .map(e => ({
                        medicineName: e,
                        usage: fakerVI.lorem.sentence({ max: 3 }),
                        quantity: fakerVI.number.int({ max: 300 }),
                    })),
            ),
            note: fakerVI.lorem.sentence(),
            prescription_filename: fakerVI.image.urlLoremFlickr(),
            examination_id: fakerVI.number.int({
                min: 1,
                max: numExaminations,
            }), // Assuming examinations are already seeded
            created_at: fakerVI.date.past({ years: 10 }),
            updated_at: fakerVI.date.recent(),
        };
    });

    await knex(tableName).insert(prescriptions);
};
