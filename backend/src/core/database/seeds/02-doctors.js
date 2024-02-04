/**
 * @param {import("knex")} knex
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { fakerVI } from '@faker-js/faker';

export const numDoctors = 20;

exports.seed = async knex => {
    await knex('doctors').del();

    // eslint-disable-next-line no-unused-vars
    const doctors = Array.from({ length: numDoctors }, (_, index) => {
        const rank = fakerVI.helpers.arrayElement(['01', '02', '03']);
        const category = fakerVI.helpers.arrayElement(['01', '02', '03']);

        return {
            full_name: fakerVI.person.fullName(),
            email: fakerVI.internet.email(),
            phone: fakerVI.phone.number(),
            password:
                '$2b$10$4WxWKojNnKfDAicVsveh7.ogkWOBMV1cvRUSPCXwxA05NRX18F0QW',
            active: true,
            locked: false,
            quota_code: `V.08.${category}.${rank}`,
            expertise: fakerVI.lorem.lines(1),
            experience: `${fakerVI.number.int({ min: 0, max: 70 })} năm kinh nghiệm`,
            work_unit: fakerVI.company.name(),
            certificate_name: fakerVI.lorem.words(8),
            certificate_number: fakerVI.random.numeric(12),
            certificate_provider: fakerVI.lorem.words(8),
        };
    });

    await knex('doctors').insert(doctors);
};
