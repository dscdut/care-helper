/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = 'medical_histories';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.text('history');
        table
            .integer('patient_id')
            .unsigned()
            .notNullable()
            .unique()
            .index()
            .references('id')
            .inTable('patients')
            .onDelete('CASCADE');
        table.dateTime('deleted_at').defaultTo(null);
    });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = async knex => {
    await knex.schema.dropTable(tableName);
};
