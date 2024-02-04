/**
 * @param { import("knex").Knex } knex
 */
const tableName = 'otps';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.string('otp');
        table.string('token');
        table.boolean('verified').defaultTo(false);
    });
};
/**
 * @param { import("knex").Knex } knex
 */
exports.down = async knex => {
    await knex.schema.dropTable(tableName);
};
