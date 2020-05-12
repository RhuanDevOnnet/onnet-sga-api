'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Modelo extends Model {

    marca(){
        return this.belongsTo('App/Models/Marca');
    }
}

module.exports = Modelo
