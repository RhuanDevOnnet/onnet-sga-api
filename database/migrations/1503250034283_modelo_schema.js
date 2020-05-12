'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ModeloSchema extends Schema {
  up () {
    this.create('modelos', (table) => {
      table.increments()
      table.string('nome' , 100).notNullable()
      table.boolean('exclusivo_mobile').notNullable()
      table.integer('marca_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('marcas')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT'),
      table.string('usuario_criacao' ,150).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('modelos')
  }
}

module.exports = ModeloSchema
