'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationsSchema extends Schema {
  up() {
    this.table('notifications', (table) => {
      table.renameColumn('user_id', 'to_user_id');

      table.dropForeign('operador_id');
      table.dropColumn('operador_id');

      table.dropColumn('protocolo');
      table.dropColumn('data');

      table.integer('from_user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
    })
  }

  down() {
    this.table('notifications', (table) => {
      table.renameColumn('to_user_id', 'user_id');

      table.dropForeign('from_user_id');
      table.dropColumn('from_user_id');

      table.integer('protocolo').unsigned();
      table.date('data');

      table.integer('operador_id')
        .unsigned()
        .references('id')
        .inTable('operadors')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
    })
  }
}

module.exports = NotificationsSchema
