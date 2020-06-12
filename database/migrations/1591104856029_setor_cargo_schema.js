'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SetorCargoSchema extends Schema {
  up () {
    this.create('setor_cargos', (table) => {
      table.increments()
      table.integer('setor_id')
      .unsigned()
      .references('setors.id')
      .onDelete('CASCADE').index('setor_id')
      table.integer('cargo_id')
      .unsigned()
      .references('cargos.id').onDelete('CASCADE').index('cargo_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('setor_cargos')
  }
}

module.exports = SetorCargoSchema
