/**
 * @param {import("knex")} knex
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { fakerEN } from '@faker-js/faker';

export const numDoctors = 20;

exports.seed = async knex => {
    await knex('doctors').del();

    // eslint-disable-next-line no-unused-vars
    const doctors = Array.from({ length: numDoctors }, (_, index) => {
        const rank = fakerEN.helpers.arrayElement(['01', '02', '03']);
        const category = fakerEN.helpers.arrayElement(['01', '02', '03']);

        return {
            full_name: fakerEN.person.fullName(),
            email: fakerEN.internet.email(),
            phone: fakerEN.string.numeric({ length: 10 }),
            password:
                '$2b$10$4WxWKojNnKfDAicVsveh7.ogkWOBMV1cvRUSPCXwxA05NRX18F0QW',
            active: true,
            locked: false,
            quota_code: `V.08.${category}.${rank}`,
            expertise: fakerEN.lorem.lines(1),
            experience: `${fakerEN.number.int({
                min: 0,
                max: 70,
            })} năm kinh nghiệm`,
            work_unit: fakerEN.company.name(),
            certificate_name: fakerEN.lorem.words(8),
            certificate_number: fakerEN.string.numeric(12),
            certificate_provider: fakerEN.lorem.words(8),
        };
    });

    await knex('doctors').insert(doctors);
};
