/* eslint-disable import/no-extraneous-dependencies */
/**
 * @param {import("knex")} knex
 */
const faker = require('faker');
const { Gender } = require('../../common/enum');

const tableName = 'patients';
export const numPatients = 10;

exports.seed = async knex => {
    await knex(tableName).del();

    // eslint-disable-next-line no-unused-vars
    const patients = Array.from({ length: numPatients }, (_, index) => ({
        full_name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        password: '$2b$10$4WxWKojNnKfDAicVsveh7.ogkWOBMV1cvRUSPCXwxA05NRX18F0QW',
        active: true,
        locked: false,
        gender: faker.random.arrayElement(Object.values(Gender)),
        birthday: faker.date.past(),
        avatar: faker.image.avatar(),
        address: faker.address.streetAddress(),
        national_id_card: faker.random.number({ min: 1000000000, max: 9999999999 }).toString(),
        insurance: faker.random.number({ min: 1000000000, max: 9999999999 }).toString(),
        profesion: faker.name.jobType(),
        deleted_at: null,
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
    }));

    await knex(tableName).insert(patients);
};
