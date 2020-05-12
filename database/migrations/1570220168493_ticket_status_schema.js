'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketStatusSchema extends Schema {
  up () {
    this.create('ticket_statuses', (table) => {
      table.increments()
      table.string('descricao' , 254)
      table.string('cor', 100)
      table.string('usuario_criacao', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('ticket_statuses')
  }
}

module.exports = TicketStatusSchema
