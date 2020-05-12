'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnexoSchema extends Schema {
  up () {
    this.create('anexos', (table) => {
      table.increments()
      table.string('title', 100).notNullable()
      table.string('url', 254).notNullable()
      table.string('type', 50).notNullable()
      table.string('sub_type', 50).notNullable()
      table.string('usuario_criacao', 150).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('anexos')
  }
}

module.exports = AnexoSchema
