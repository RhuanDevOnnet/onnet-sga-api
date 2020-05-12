'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquipamentSchema extends Schema {
  up () {
    this.create('equipaments', (table) => {
      table.increments()
      table.date('data_aquisicao').notNullable()
      table.string('nome', 254).notNullable()
      table.boolean('alocado')
      table.integer('modelo_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('modelos')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.string('configuracao', 254)
      table.string('usuario_criacao', 100).notNullable()
      table.timestamps()
    });
  }

  down () {
    this.drop('equipaments')
  }
}

module.exports = EquipamentSchema
