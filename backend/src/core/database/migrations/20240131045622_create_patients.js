const { Gender } = require('../../common/enum');
/**
 * @param { import("knex").Knex } knex
 */
const DEFAULT_PASSWORD = '$2b$10$4WxWKojNnKfDAicVsveh7.ogkWOBMV1cvRUSPCXwxA05NRX18F0QW';
const tableName = 'patients';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.string('full_name');
        table.string('email').index();
        table.string('phone').unique().index();
        table.string('password').defaultTo(DEFAULT_PASSWORD);
        table.boolean('active').defaultTo(false);
        table.boolean('locked').defaultTo(false);
        table.enu('gender', Object.values(Gender));
        table.date('birthday').nullable();
        table.string('avatar').nullable();
        table.string('address').nullable();
        table.string('national_id_card', 20);
        table.string('insurance', 20);
        table.string('profesion');
        table.integer('height');
        table.float('weight', 1);
        table.dateTime('deleted_at').defaultTo(null);
        table.timestamps(false, true);
    });

    await knex.raw(`
   CREATE TRIGGER update_timestamp
   BEFORE UPDATE
   ON ${tableName}
   FOR EACH ROW
   EXECUTE PROCEDURE update_timestamp();
 `);
};
/**
 * @param { import("knex").Knex } knex
 */
exports.down = async knex => {
    await knex.schema.dropTable(tableName);
    await knex.raw(`DROP TRIGGER IF EXISTS update_timestamp ON ${tableName};`);
};
