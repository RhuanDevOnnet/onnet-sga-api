'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ticket extends Model {

    user(){
        return this.belongsTo('App/Models/User');
    }

    setor(){
        return this.belongsTo('App/Models/Setor');
    }

    ticketStatus(){
        return this.belongsTo('App/Models/TicketStatus');
    }

    operador(){
        return this.belongsTo('App/Models/Operador', 'operador_responsavel');
    }

    cidade(){
        return this.belongsTo('App/Models/Cidade');
    }

    anexo(){
        return this.belongsToMany('App/Models/Anexo').pivotTable('ticket_anexos');
    }
}

module.exports = Ticket
