/**
 * @param { import("knex").Knex } knex
 */
const tableName = 'meetings';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.string('title', 255);
        table.dateTime('start_time');
        table.datetime('end_time');
        table.string('place', 255);
        table.string('note', 512);
        table
            .integer('doctor_id')
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('doctors')
            .onDelete('CASCADE');
        table
            .integer('patient_id')
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('patients')
            .onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
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
