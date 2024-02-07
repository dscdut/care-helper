/**
 * @param { import("knex").Knex } knex
 */
const tableName = 'prescriptions';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.date('start_date');
        table.date('end_date');
        table.text('details');
        table.string('note', 512);
        table.string('prescription_filename', 255);
        table
            .integer('examination_id')
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('examinations')
            .onDelete('CASCADE');
        table.timestamps(true, true);
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
