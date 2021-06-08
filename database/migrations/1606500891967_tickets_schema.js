'use strict'

const Schema = use('Schema')

class TicketsSchema extends Schema {
  up() {
    this.table('tickets', (table) => {
      table.string('error_message', 512)
    })
  }

  down() {
    this.table('tickets', (table) => {
      table.dropColumn('error_message')
    })
  }
}

module.exports = TicketsSchema
