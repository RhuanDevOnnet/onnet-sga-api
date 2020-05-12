'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PhoneSchema extends Schema {
  up () {
    this.create('phones', (table) => {
      table.increments()
      table.string('imei', 100).notNullable()
      table.string('imei02', 100).notNullable()
      table.string('serial', 100).notNullable()
      table.string('sub_modelo', 100).notNullable()
      table.string('versao_so', 30).notNullable()
      table.string('cor', 50).notNullable()
      table.boolean('alocado').notNullable()
      table.string('observacao', 254)
      table.boolean('estragado').notNullable()
      table.date('data_aquisicao').notNullable()
      table.string('motivo_danificado')
      table.integer('situation_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('situations')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      .index('situation_id')
      table.integer('modelo_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('modelos')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.string('usuario_criacao', 200).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('phones')
  }
}

module.exports = PhoneSchema
