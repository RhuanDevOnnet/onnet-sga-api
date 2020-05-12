'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Situation extends Model {

    chip(){
        return this.hasMany("App/Models/Chip");
    }

    phone(){
        return this.hasMany("App/Models/Phone");
    }

   
}

module.exports = Situation
