'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SituationSchema extends Schema {
  up() {
    this.create('situations', (table) => {
      table.increments()
      table.string('descricao', 254)
      table.string('usuario_criacao', 100)
      table.timestamps()
    })
  }

  down() {
    this.drop('situations')
  }
}

module.exports = SituationSchema
