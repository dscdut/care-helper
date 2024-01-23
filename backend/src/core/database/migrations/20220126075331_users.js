const { Role } = require('../../common/enum');

/**
 * @param {import("knex")} knex
 */
const tableName = 'users';
// 123456
const DEFAULT_PASSWORD =
    '$2b$10$4WxWKojNnKfDAicVsveh7.ogkWOBMV1cvRUSPCXwxA05NRX18F0QW';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.string('full_name');
        table.string('email').unique();
        table.string('phone').unique().notNullable();
        table.string('password').defaultTo(DEFAULT_PASSWORD);
        table.dateTime('deleted_at').defaultTo(null);
        table.timestamps(false, true);
        table.boolean('gender').nullable();
        table.date('birthday').nullable();
        table.string('avatar').nullable();
        table.string('address').nullable();
        table.enu('role', Object.values(Role)).notNullable();
    });

    await knex.raw(`
   CREATE TRIGGER update_timestamp
   BEFORE UPDATE
   ON ${tableName}
   FOR EACH ROW
   EXECUTE PROCEDURE update_timestamp();
 `);
};

exports.down = knex =>
    knex.schema
        .dropTable(tableName)
        .raw('DROP TRIGGER IF EXISTS update_timestamp');
