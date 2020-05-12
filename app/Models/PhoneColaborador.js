'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PhoneColaborador extends Model {

    phone(){
        return this.belongsTo("App/Models/Phone", "phones_id");
    }

    collaborator (){
        return this.belongsTo("App/Models/Collaborator", "collaborators_id");
    }

    chip(){
        return this.belongsTo("App/Models/Chip");
    }

    mobileEmail(){
        return this.belongsTo("App/Models/MobileEmail" );
    }

}

module.exports = PhoneColaborador
