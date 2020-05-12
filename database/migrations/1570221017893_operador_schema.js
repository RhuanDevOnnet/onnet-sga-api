'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OperadorSchema extends Schema {
  up () {
    this.create('operadors', (table) => {
      table.increments()
      table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.integer('setor_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('setors')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.timestamps()
    })
  }

  down () {
    this.drop('operadors')
  }
}

module.exports = OperadorSchema
