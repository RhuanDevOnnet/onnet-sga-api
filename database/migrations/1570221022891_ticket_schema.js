'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketSchema extends Schema {
  up () {
    this.create('tickets', (table) => {
      table.increments()
      table.boolean('resolvido')
      table.string('descricao' , 254).notNullable()
      table.string('assunto' , 254).notNullable()
      table.boolean('isPortability')
      table.string('cliente_onnet', 200)
      table.string('cliente_portabilidade', 200)
      table.string('cpfCnpj', 14)
      table.string('operadora_doadora', 100)
      table.string('num_telefone', 20)
      table.integer('cidade_id')
      .unsigned()
      .references('id').inTable('cidades')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.integer('operador_responsavel')
      .unsigned()
      .references('id').inTable('operadors')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.integer('ticket_status_id')
      .unsigned()
      .references('id').inTable('ticket_statuses')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.integer('setor_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('setors')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.string('usuario_criacao' , 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tickets')
  }
}

module.exports = TicketSchema
