'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.integer('setor_id')
        .unsigned()
        .references('id')
        .inTable('setors')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
    })
  }

  down() {
    this.table('users', (table) => {
      table.dropForeign('setor_id');
      table.dropColumn('setor_id');
    })
  }
}

module.exports = UserSchema
