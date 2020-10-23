'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketAtendenteSchema extends Schema {
  up() {
    this.table('ticket_atendentes', (table) => {
      table.boolean('visualizado')
        .defaultTo(false);
    })
  }

  down() {
    this.table('ticket_atendentes', (table) => {
      table.dropColumn('visualizado');
    })
  }
}

module.exports = TicketAtendenteSchema
