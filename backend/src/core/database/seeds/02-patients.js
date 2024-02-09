/* eslint-disable import/no-extraneous-dependencies */
/**
 * @param {import("knex")} knex
 */
import { fakerEN } from '@faker-js/faker';

const { Gender } = require('../../common/enum');

const tableName = 'patients';
export const numPatients = 100;

exports.seed = async knex => {
    await knex(tableName).del();

    // eslint-disable-next-line no-unused-vars
    const patients = Array.from({ length: numPatients }, (_, index) => ({
        full_name: fakerEN.person.fullName(),
        email: fakerEN.internet.email(),
        phone: fakerEN.string.numeric({ length: 10 }),
        password:
            '$2b$10$4WxWKojNnKfDAicVsveh7.ogkWOBMV1cvRUSPCXwxA05NRX18F0QW',
        active: true,
        locked: false,
        gender: fakerEN.helpers.objectValue(Gender),
        birthday: fakerEN.date.birthdate(),
        avatar: fakerEN.image.avatarLegacy(),
        address: fakerEN.location.streetAddress(true),
        national_id_card: fakerEN.string.numeric(12),
        insurance: fakerEN.string.numeric(10),
        profesion: fakerEN.person.jobTitle(),
        deleted_at: null,
        created_at: fakerEN.date.past(),
        updated_at: fakerEN.date.past(),
    }));

    await knex(tableName).insert(patients);
};
