'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CollaboratorEquipamentSchema extends Schema {
  up () {
    this.create('collaborator_equipaments', (table) => {
      table.increments()
      table.date('data_comodato').notNullable()
      table.date('data_devolucao')
      table.string('observacao', 254)
      table.boolean('termo_assinado').notNullable()
      table.integer('colaborador_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('collaborators')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.integer('equipament_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('equipaments')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.string('usuario_criacao', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('collaborator_equipaments')
  }
}

module.exports = CollaboratorEquipamentSchema
