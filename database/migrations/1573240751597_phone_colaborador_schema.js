'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PhoneColaboradorSchema extends Schema {
  up () {
    this.create('phone_colaboradors', (table) => {
      table.increments()
      table.date('data_comodato').notNullable()
      table.date('data_devolucao')
      table.boolean('termo_assinado').notNullable()
      table.string('acessorios' , 254)
      table.integer('phones_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('phones')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      .index('phones_id')
      table.integer('collaborators_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('collaborators')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      .index('collaborators_id')
      table.integer('chip_id')
      .unsigned()
      .references('id').inTable('chips')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.integer('mobile_email_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('mobile_emails')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      table.string('usuario_criacao' , 130)
      table.timestamps()
    })
  }

  down () {
    this.drop('phone_colaboradors')
  }
}

module.exports = PhoneColaboradorSchema
