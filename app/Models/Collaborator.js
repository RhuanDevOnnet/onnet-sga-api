'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Collaborator extends Model {

    cargo(){
        return this.belongsTo('App/Models/Cargo');
    }

    setor(){
        return this.belongsTo('App/Models/Setor');
    }

    email(){
        return this.belongsTo('App/Models/Email');
    }

    empresa(){
        return this.belongsTo('App/Models/Empresa');
    }

    phoneColaborador(){
        return this.hasMany("App/Models/PhoneColaborador");
    }


}

module.exports = Collaborator
