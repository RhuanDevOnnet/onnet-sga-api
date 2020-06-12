'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Setor extends Model {
  cargo() {
    return this.belongsToMany('App/Models/Cargo').pivotTable('setor_cargos')
  }
}

module.exports = Setor
