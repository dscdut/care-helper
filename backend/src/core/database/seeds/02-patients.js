/* eslint-disable import/no-extraneous-dependencies */
/**
 * @param {import("knex")} knex
 */
import { fakerVI } from '@faker-js/faker';

const { Gender } = require('../../common/enum');

const tableName = 'patients';
export const numPatients = 100;

exports.seed = async knex => {
    await knex(tableName).del();

    // eslint-disable-next-line no-unused-vars
    const patients = Array.from({ length: numPatients }, (_, index) => ({
        full_name: fakerVI.person.fullName(),
        email: fakerVI.internet.email(),
        phone: fakerVI.phone.number(),
        password: '$2b$10$4WxWKojNnKfDAicVsveh7.ogkWOBMV1cvRUSPCXwxA05NRX18F0QW',
        active: true,
        locked: false,
        gender: fakerVI.helpers.objectValue(Gender),
        birthday: fakerVI.date.birthdate(),
        avatar: fakerVI.image.avatarLegacy(),
        address: fakerVI.location.streetAddress(true),
        national_id_card: fakerVI.random.numeric(12),
        insurance: fakerVI.random.numeric(10),
        profesion: fakerVI.person.jobTitle(),
        deleted_at: null,
        created_at: fakerVI.date.past(),
        updated_at: fakerVI.date.past(),
    }));

    await knex(tableName).insert(patients);
};
