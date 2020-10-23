'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketSchema extends Schema {
  up() {
    this.table('tickets', (table) => {
      table.boolean('sucesso')
        .defaultTo(false);
    })
  }

  down() {
    this.table('tickets', (table) => {
      table.dropColumn('sucesso');
    })
  }
}

module.exports = TicketSchema
