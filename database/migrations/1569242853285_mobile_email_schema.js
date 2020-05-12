'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MobileEmailSchema extends Schema {
  up () {
    this.create('mobile_emails', (table) => {
      table.increments()
      table.string('mobil_email' , 254).notNullable()
      table.string('senha' , 20).notNullable()
      table.boolean('disponivel').notNullable()
      table.string('usuario_criacao', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('mobile_emails')
  }
}

module.exports = MobileEmailSchema
