'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChipSchema extends Schema {
  up () {
    this.create('chips', (table) => {
      table.increments()
      table.string('operadora' , 50).notNullable()
      table.string('numero_tel', 20).notNullable()
      table.boolean('em_uso').notNullable()
      table.decimal('saldo' , 9 , 2).notNullable()
      table.integer('situation_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('situations')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      .index('situation_id')
      table.string('usuario_criacao' , 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('chips')
  }

}

module.exports = ChipSchema
