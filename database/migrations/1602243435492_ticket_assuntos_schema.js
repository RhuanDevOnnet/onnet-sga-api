'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketAssuntosSchema extends Schema {
  up () {
    this.create('ticket_assuntos', (table) => {
      table.increments();
      table.string("descricao");
      table.timestamps();
    })
  }

  down () {
    this.drop('ticket_assuntos')
  }
}

module.exports = TicketAssuntosSchema
