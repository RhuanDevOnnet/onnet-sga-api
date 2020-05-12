'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CollaboratorEquipament extends Model {

   colaborador(){
    return this.belongsTo('App/Models/Collaborator' , 'colaborador_id', 'id');
   }

   equipamento(){
    return this.belongsTo('App/Models/Equipament');
   }
}

module.exports = CollaboratorEquipament
