'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Operador extends Model {

    setor() {
        return this.belongsTo('App/Models/setor');
    }

    user() {
        return this.belongsTo('App/Models/User');
    }

}

module.exports = Operador
