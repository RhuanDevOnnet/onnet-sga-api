'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {

    ticket() {
        return this.belongsTo('App/Models/Ticket');
    }

    from_user() {
        return this.belongsTo('App/Models/User', 'from_user_id', 'id');
    }

    to_user() {
        return this.belongsTo('App/Models/User', 'to_user_id', 'id');
    }
}

module.exports = Notification
