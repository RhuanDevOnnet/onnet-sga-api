'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissaoSchema extends Schema {
  up () {
    this.create('permissaos', (table) => {
      table.increments()
      table.string('nome' , 100).notNullable();
      table.string('usuario_criacao', 100).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('permissaos')
  }
}

module.exports = PermissaoSchema
