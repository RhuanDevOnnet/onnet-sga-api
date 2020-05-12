'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SetorSchema extends Schema {
  up () {
    this.create('setors', (table) => {
      table.increments()
      table.string('nome' , 80).notNullable()
      table.string('supervisor' , 100).notNullable();
      table.string('usuario_criacao',100).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('setors')
  }
}

module.exports = SetorSchema
