/**
 * @param { import("knex").Knex } knex
 */
const tableName = 'otps';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.string('otp', 6);
        table.string('token');
        table.boolean('verified').defaultTo(false);
        table.tinyint('attempt', 1).unsigned().defaultTo(0);
    });
};
/**
 * @param { import("knex").Knex } knex
 */
exports.down = async knex => {
    await knex.schema.dropTable(tableName);
};
