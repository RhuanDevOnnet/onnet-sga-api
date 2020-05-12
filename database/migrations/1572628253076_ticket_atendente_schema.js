'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketAtendenteSchema extends Schema {
  up () {
    this.create('ticket_atendentes', (table) => {
      table.increments()
      table.integer('operador_id')
      .unsigned()
      .references('id').inTable('operadors')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.integer('ticket_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('tickets')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      .index('ticket_id')
      table.string('mensagem')
      table.string('imagem')
      table.integer('user_id')
      .unsigned()
      .references('id').inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      .index('user_id')
      table.timestamps()
      
    })
  }

  down () {
    this.drop('ticket_atendentes')
  }
}

module.exports = TicketAtendenteSchema
