/**
 * @param {import("knex")} knex
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { fakerVI } from '@faker-js/faker';
import { numExaminations } from './04-examinations';

const tableName = 'tests';
export const numTests = 44;// You can adjust the number of tests you want to create
const test_types = [
    { name: 'Huyết áp', unit: 'mmHg' },
    { name: 'Nhiệt độ cơ thể', unit: 'Độ C hoặc Độ F' },
    { name: 'Đường huyết', unit: 'mmol/L hoặc mg/dL' },
    { name: 'Máu', unit: '/mm³ hoặc %' },
    { name: 'Cholesterol', unit: 'mg/dL' },
    { name: 'Đường huyết', unit: 'mmol/L hoặc mg/dL' },
    { name: 'Protein trong nước tiểu', unit: 'g/L' },
    { name: 'Chức năng gan (AST, ALT)', unit: 'U/L' },
    { name: 'Chức năng thận (Creatinine)', unit: 'μmol/L hoặc mg/dL' },
    { name: 'Chức năng tuyến giáp (TSH)', unit: 'mIU/L' },
    { name: 'Điện giải máu', unit: 'mEq/L' },
    { name: 'Troponin', unit: 'ng/mL' },
    { name: 'D-Dimer', unit: 'ng/mL' },
    { name: 'Troponin I', unit: 'ng/mL' },
    { name: 'Troponin T', unit: 'ng/mL' },
    { name: 'C-reactive protein (CRP)', unit: 'mg/L' },
    { name: 'Procalcitonin', unit: 'ng/mL' },
    { name: 'Hemoglobin A1c (HbA1c)', unit: '%' },
    { name: 'Cholesterol LDL', unit: 'mg/dL' },
    { name: 'Cholesterol HDL', unit: 'mg/dL' },
    { name: 'Triglycerides', unit: 'mg/dL' },
    { name: 'Hematocrit', unit: '%' },
    { name: 'Bilirubin', unit: 'μmol/L hoặc mg/dL' },
    { name: 'Albumin', unit: 'g/L' },
    { name: 'Phosphorus', unit: 'mg/dL' },
    { name: 'Magnesium', unit: 'mg/dL' },
    { name: 'Potassium', unit: 'mEq/L' },
    { name: 'Sodium', unit: 'mEq/L' },
    { name: 'Thyroxine (T4)', unit: 'μg/dL' },
    { name: 'Thyroid-stimulating hormone (TSH)', unit: 'mIU/L' },
    { name: 'Folate', unit: 'ng/mL' },
    { name: 'Vitamin B12', unit: 'pg/mL' },
    { name: 'Iron', unit: 'μg/dL' },
    { name: 'Ferritin', unit: 'ng/mL' },
    { name: 'Testosterone', unit: 'ng/dL' },
    { name: 'Estradiol', unit: 'pg/mL' },
    { name: 'Progesterone', unit: 'ng/mL' }
];

exports.seed = async knex => {
    await knex(tableName).del();

    const tests = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= numTests; i++) {
        const test = {
            test_rows: JSON.stringify(
                fakerVI.helpers.arrayElements(test_types).map(e => ({
                    ...e,
                    value: fakerVI.number.float({ fractionDigits: 1, max: 1000 }),
                }))
            ),
            examination_id: fakerVI.number.int({
                min: 1,
                max: numExaminations,
            }), // Assuming examinations are already seeded
            created_at: fakerVI.date.past({ years: 10 }),
        };

        tests.push(test);
    }
    await knex(tableName).insert(tests);
};
