'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TicketAtendente extends Model {

    user(){
        return this.belongsTo('App/Models/User', 'user_id', 'id');
    }
    
    ticket(){
        return this.belongsTo('App/Models/Ticket', 'ticket_id', 'id' );
    }

}

module.exports = TicketAtendente
