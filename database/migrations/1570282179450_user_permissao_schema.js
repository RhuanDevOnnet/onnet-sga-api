'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPermissaoSchema extends Schema {
  up () {
    this.create('user_permissao', (table) => {
      table.increments()
      table.integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE').index('user_id')
      table.integer('permissao_id')
      .unsigned()
      .references('permissaos.id').onDelete('CASCADE').index('permissao_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_permissao')
  }
}

module.exports = UserPermissaoSchema
