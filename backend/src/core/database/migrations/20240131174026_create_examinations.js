/**
 * @param { import("knex").Knex } knex
 */
const tableName = 'examinations';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.string('diagnose',255);
        table.string('advice', 1000);
        table
            .integer('doctor_id')
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('doctors');
        table
            .integer('patient_id')
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('patients');
        table
            .integer('hospital_id')
            .unsigned()
            .notNullable()
            .index()
            .references('id')
            .inTable('hospitals')
            .onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};
/**
 * @param { import("knex").Knex } knex
 */
exports.down = async knex=>{
    await knex.schema.dropTable(tableName);
};
