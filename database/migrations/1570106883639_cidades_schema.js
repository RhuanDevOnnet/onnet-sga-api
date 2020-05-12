'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CidadesSchema extends Schema {
  up () {
    this.create('cidades', (table) => {
      table.increments()
      table.string('nome', 150).notNullable()
      table.string('cnl', 100).notNullable()
      table.string('eot', 100).notNullable()
      table.string('usuario_criacao', 200).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cidades')
  }
}

module.exports = CidadesSchema
