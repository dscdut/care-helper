/**
 * @param {import("knex")} knex
 */
const tableName = 'patients';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.string('national_id_card', 20);
        table.string('insurance', 20);
        table.string('profesion');
        table.dateTime('deleted_at').defaultTo(null);
        table.timestamps(false, true);
        table
            .integer('user_id')
            .unsigned()
            .notNullable()
            .unique()
            .index()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
    });

    await knex.raw(`
   CREATE TRIGGER update_timestamp
   BEFORE UPDATE
   ON ${tableName}
   FOR EACH ROW
   EXECUTE PROCEDURE update_timestamp();
 `);
};

exports.down = async knex => {
    await knex.schema.dropTable(tableName);
    await knex.raw(`DROP TRIGGER IF EXISTS update_timestamp ON ${tableName};`);
};
