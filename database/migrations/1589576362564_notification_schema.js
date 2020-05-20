'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.integer('operador_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('operadors')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      .index('operador_id')
      table.integer('ticket_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('tickets')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      .index('ticket_id')
      table.integer('user_id')
      .unsigned()
      .references('id').inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      .index('user_id')
      table.integer('protocolo').unsigned()
      table.string('text')
      table.date('data')
      table.boolean('visited')
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationSchema
