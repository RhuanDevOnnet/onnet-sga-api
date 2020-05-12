'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Anexo extends Model {

    ticket(){
        return this.belongsToMany('App/Models/Ticket').pivotTable('ticket_anexos');
    }


}

module.exports = Anexo
