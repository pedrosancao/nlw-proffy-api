import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', table => {
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('avatar').nullable().alter();
    table.string('title').nullable().alter();
    table.string('bio', 1000).nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', table => {
    table.dropColumn('email');
    table.dropColumn('password');
    table.string('avatar').notNullable().alter();
    table.string('title').notNullable().alter();
    table.string('bio', 1000).notNullable().alter();
  });
}
