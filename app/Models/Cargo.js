'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cargo extends Model {

    setor(){
        return this.belongsToMany('App/Models/Setor').pivotTable('setor_cargos');
    }

}

module.exports = Cargo
