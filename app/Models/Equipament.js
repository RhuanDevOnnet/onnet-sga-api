'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Equipament extends Model {

    modelo(){
        return this.belongsTo("App/Models/Modelo");
    }

    

}

module.exports = Equipament
