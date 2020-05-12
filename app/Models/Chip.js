'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chip extends Model {

    situation(){
        return this.belongsTo("App/Models/Situation");
    }


}

module.exports = Chip
