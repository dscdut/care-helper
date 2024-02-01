const { Role, Gender } = require('../../common/enum');

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
        table.string('email').index();
        table.string('phone').index();
        table.string('password').defaultTo(DEFAULT_PASSWORD);
        table.boolean('active').defaultTo(true);
        table.boolean('locked').defaultTo(false);
        table.enu('gender', Object.values(Gender));
        table.date('birthday').nullable();
        table.string('avatar').nullable();
        table.string('address').nullable();
        table.timestamps(false, true);
        table.dateTime('deleted_at').defaultTo(null);
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

exports.down = async knex => {
    await knex.schema.dropTable(tableName);
    await knex.raw(`DROP TRIGGER IF EXISTS update_timestamp ON ${tableName};`);
};
