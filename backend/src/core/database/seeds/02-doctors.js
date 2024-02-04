/**
 * @param {import("knex")} knex
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

function generateRandomPhoneNumber() {
    return `0${Math.floor(Math.random() * 90000000) + 10000000}`;
}

export const numDoctors = 6;

exports.seed = async knex => {
    await knex('doctors').del();

    const doctors = Array.from({ length: numDoctors }, (_, index) => ({
        full_name: faker.name.findName(),
        email: `doctor${index + 1}@gmail.com`,
        phone: generateRandomPhoneNumber(),
        active: true,
        // avatar: faker.image.avatar(),
        // address: faker.address.streetAddress(),
        quota_code: faker.random.alphaNumeric(25),
        expertise: faker.random.words(),
        experience: faker.random.words(3),
        work_unit: faker.company.companyName(),
        certificate_name: faker.random.words(2),
        certificate_number: faker.random.alphaNumeric(25),
        certificate_provider: faker.random.words(3),
    }));

    await knex('doctors').insert(doctors);
};
