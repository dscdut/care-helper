/**
 * @param { import("knex").Knex } knex
 */
const tableName = 'tests';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.float('blood_pressure');
        table.float('blood_sugar');
        table.float('blood_ure');
        table.float('blood_acid_urid');
        table.float('blood_creatinin');
        table.float('toltal_cholesterol');
        table.float('idc_cholesterol');
        table.float('triglyceride');
        table.float('hdi_cholesterol');
        table
            .integer('examination_id')
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('examinations')
            .onDelete('CASCADE');
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
exports.down = async knex=>{
    await knex.schema.dropTable(tableName);
    await knex.raw(`DROP TRIGGER IF EXISTS update_timestamp ON ${tableName};`);
};
