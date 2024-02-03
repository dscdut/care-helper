/**
 * @param {import("knex")} knex
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const { Gender } = require('../../common/enum');

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
        password: 'your_hashed_password', // Replace with the actual hashed password
        active: true,
        locked: false,
        gender: faker.random.arrayElement(Object.values(Gender)),
        birthday: faker.date.past(30).toISOString().split('T')[0],
        avatar: faker.image.avatar(),
        address: faker.address.streetAddress(),
        quota_code: faker.random.alphaNumeric(25),
        expertise: faker.random.words(),
        experience: faker.random.words(3),
        work_unit: faker.company.companyName(),
        certificate: faker.random.words(2),
    }));

    await knex('doctors').insert(doctors);
};
