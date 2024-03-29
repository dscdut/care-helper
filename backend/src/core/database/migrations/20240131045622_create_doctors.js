/**
 * @param { import("knex").Knex } knex
 */
const DEFAULT_PASSWORD = '$2b$10$4WxWKojNnKfDAicVsveh7.ogkWOBMV1cvRUSPCXwxA05NRX18F0QW';
const tableName = 'doctors';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.string('email').unique().index();
        table.string('phone').index();
        table.string('password').defaultTo(DEFAULT_PASSWORD);
        table.string('full_name');
        table.boolean('active').defaultTo(false);
        table.boolean('locked').defaultTo(false);
        table.string('quota_code', 25);
        table.string('expertise');
        table.string('experience', 100);
        table.string('work_unit');
        table.string('certificate_name');
        table.string('certificate_number');
        table.string('certificate_provider');
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
