/**
 * @param { import("knex").Knex } knex
 */
const tableName = 'drugs';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.string('name', 255).primary();
    });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = async knex => {
    await knex.schema.dropTable(tableName);
};
