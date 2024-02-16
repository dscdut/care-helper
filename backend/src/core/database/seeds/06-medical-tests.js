/**
 * @param {import("knex")} knex
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { fakerEN } from '@faker-js/faker';
import { numExaminations } from './04-examinations';

const tableName = 'tests';
export const numTests = 1200; // You can adjust the number of tests you want to create

const test_type0 = [
    { name: 'Blood Pressure', unit: 'mmHg', type: 'main' },
    { name: 'Body Temperature', unit: '°C or °F', type: 'main' },
    { name: 'Heart Rate', unit: 'BPM', type: 'main' },
];

const test_type1 = [
    { name: 'Blood Glucose', unit: 'mmol/L or mg/dL', type: 'blood' },
    { name: 'Blood Count', unit: '/mm³ or %', type: 'blood' },
    { name: 'Cholesterol', unit: 'mg/dL', type: 'blood' },
    { name: 'Blood Sugar', unit: 'mmol/L or mg/dL', type: 'blood' },
    { name: 'Protein in Urine', unit: 'g/L', type: 'blood' },
    { name: 'Liver Function (AST, ALT)', unit: 'U/L', type: 'blood' },
    { name: 'Kidney Function (Creatinine)', unit: 'μmol/L or mg/dL', type: 'blood' },
    { name: 'Thyroid Function (TSH)', unit: 'mIU/L', type: 'blood' },
    { name: 'Blood Electrolytes', unit: 'mEq/L', type: 'blood' },
    { name: 'Troponin', unit: 'ng/mL', type: 'blood' },
    { name: 'D-Dimer', unit: 'ng/mL', type: 'blood' },
    { name: 'Troponin I', unit: 'ng/mL', type: 'blood' },
    { name: 'Troponin T', unit: 'ng/mL', type: 'blood' },
    { name: 'C-reactive Protein (CRP)', unit: 'mg/L', type: 'blood' },
    { name: 'Procalcitonin', unit: 'ng/mL', type: 'blood' },
    { name: 'Hemoglobin A1c (HbA1c)', unit: '%', type: 'blood' },
    { name: 'LDL Cholesterol', unit: 'mg/dL', type: 'blood' },
    { name: 'HDL Cholesterol', unit: 'mg/dL', type: 'blood' },
    { name: 'Triglycerides', unit: 'mg/dL', type: 'blood' },
    { name: 'Hematocrit', unit: '%', type: 'blood' },
    { name: 'Bilirubin', unit: 'μmol/L or mg/dL', type: 'blood' },
    { name: 'Albumin', unit: 'g/L', type: 'blood' },
    { name: 'Phosphorus', unit: 'mg/dL', type: 'blood' },
    { name: 'Magnesium', unit: 'mg/dL', type: 'blood' },
    { name: 'Potassium', unit: 'mEq/L', type: 'blood' },
    { name: 'Sodium', unit: 'mEq/L', type: 'blood' },
    { name: 'Thyroxine (T4)', unit: 'μg/dL', type: 'blood' },
    { name: 'Thyroid-stimulating Hormone (TSH)', unit: 'mIU/L', type: 'blood' },
    { name: 'Folate', unit: 'ng/mL', type: 'blood' },
    { name: 'Vitamin B12', unit: 'pg/mL', type: 'blood' },
    { name: 'Iron', unit: 'μg/dL', type: 'blood' },
    { name: 'Ferritin', unit: 'ng/mL', type: 'blood' },
    { name: 'Testosterone', unit: 'ng/dL', type: 'blood' },
    { name: 'Estradiol', unit: 'pg/mL', type: 'blood' },
    { name: 'Progesterone', unit: 'ng/mL', type: 'blood' },
];

const test_type2 = [
    { name: 'Protein in Urine', unit: 'g/L', type: 'urogenital' },
    { name: 'Bilirubin', unit: 'μmol/L or mg/dL', type: 'urogenital' },
    { name: 'Urobilinogen', unit: 'μmol/L or mg/dL', type: 'urogenital' },
    { name: 'Creatinine in Urine', unit: 'mmol/L or mg/dL', type: 'urogenital' },
    { name: 'Sodium in Urine', unit: 'mEq/L', type: 'urogenital' },
];

const test_type3 = [
    { name: 'Cholesterol', unit: 'mg/dL', type: 'blood fat' },
    { name: 'Cholesterol LDL', unit: 'mg/dL', type: 'blood fat' },
    { name: 'Cholesterol HDL', unit: 'mg/dL', type: 'blood fat' },
    { name: 'Triglycerides', unit: 'mg/dL', type: 'blood fat' },
    { name: 'Lipoprotein(a)', unit: 'mg/dL', type: 'blood fat' },
];

exports.seed = async knex => {
    await knex(tableName).del();

    // Evenly distribute values
    let shuffledExaminationIds = Array.from(
        {
            length: Math.floor((numExaminations / numTests) * numExaminations),
        },
        (_, index) => ((index + 1) % numExaminations !== 0
            ? (index + 1) % numExaminations
            : numExaminations),
    );
    shuffledExaminationIds = shuffledExaminationIds.concat(
        numTests - shuffledExaminationIds.length > 0
            ? Array.from(
                { length: numTests - shuffledExaminationIds.length },
                (_, index) => fakerEN.number.int({ min: 1, max: numExaminations }),
            )
            : [],
    );

    const tests = [];

    for (let i = 1; i <= numTests; i += 1) {
        const test = {
            test_rows: JSON.stringify(
                test_type0
                    .concat(
                        fakerEN.helpers
                            .arrayElements(test_type1)
                            .concat(fakerEN.helpers.arrayElements(test_type2).concat(fakerEN.helpers.arrayElements(test_type3))),
                    )
                    .map(e => ({
                        ...e,
                        value: fakerEN.number.float({
                            fractionDigits: 1,
                            max: 1000,
                        }),
                    })),
            ),
            examination_id: shuffledExaminationIds.splice(
                shuffledExaminationIds.length * Math.random() || 0,
                1,
            )[0],
            created_at: fakerEN.date.past({ years: 10 }),
        };

        tests.push(test);
    }
    await knex(tableName).insert(tests);
};
