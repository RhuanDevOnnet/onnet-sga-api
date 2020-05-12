'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CollaboratorSchema extends Schema {
  up () {
    this.create('collaborators', (table) => {
      table.increments()
      table.string('nome' , 150).notNullable()
      table.string('contato', 150).notNullable()
      table.string('usuario_criacao' , 150).notNullable()
      table.boolean('desligado').notNullable();
      table.integer('empresa_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('empresas')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.integer('email_id')
      .unsigned()
      .references('id').inTable('emails')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.integer('setor_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('setors')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.integer('cargo_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('cargos')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.timestamps()
    })
  }

  down () {
    this.drop('collaborators')
  }
}

module.exports = CollaboratorSchema
