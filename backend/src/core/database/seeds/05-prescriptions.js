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
const numPrescriptions = 1200; // Adjust the number of prescriptions you want to generate

exports.seed = async knex => {
    await knex(tableName).del();
    const drugsList = await readJsonFile(drugsFilePath);

    // Evenly distribute values
    let shuffledExaminationIds = Array.from(
        {
            length: Math.floor(
                (numExaminations / numPrescriptions) * numExaminations,
            ),
        },
        (_, index) => ((index + 1) % numExaminations !== 0 ? ((index + 1) % numExaminations) : numExaminations),
    );
    shuffledExaminationIds = shuffledExaminationIds.concat(
        numPrescriptions - shuffledExaminationIds.length > 0
            ? Array.from(
                { length: numPrescriptions - shuffledExaminationIds.length },
                (_, index) => fakerVI.number.int({ min: 1, max: numExaminations }),
            )
            : [],
    );

    const prescriptions = Array.from({ length: numPrescriptions }, () => {
        const startDate = fakerVI.date.between({
            from: fakerVI.date.past(),
            to: fakerVI.date.future(),
        });

        const endDate = fakerVI.date.between({
            from: startDate,
            to: new Date(startDate.getTime() + 90 * 24 * 60 * 60 * 1000), // 90 days
        });
        return {
            start_date: startDate,
            end_date: endDate,
            details: JSON.stringify(
                fakerVI.helpers
                    .arrayElements(drugsList, { min: 1, max: 10 })
                    .map(e => ({
                        medicineName: e,
                        medicineType: 'Viên nén',
                        quantity: fakerVI.number.int({ max: 300 }),
                        amount: fakerVI.lorem.sentence({ max: 10 }),
                        usage: fakerVI.lorem.sentence({ max: 10 }),
                    })),
            ),
            note: fakerVI.lorem.sentence(),
            prescription_filename: fakerVI.image.urlLoremFlickr(),
            examination_id: shuffledExaminationIds.splice(shuffledExaminationIds.length * Math.random() || 0, 1)[0], // Assuming examinations are already seeded
            created_at: fakerVI.date.past({ years: 10 }),
            updated_at: fakerVI.date.recent(),
        };
    });

    await knex(tableName).insert(prescriptions);
};
