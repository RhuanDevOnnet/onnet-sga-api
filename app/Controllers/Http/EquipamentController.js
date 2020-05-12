'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Equipament = use('App/Models/Equipament');
class EquipamentController {
  /**
   * Show a list of all equipaments.
   * GET equipaments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const equipaments = await Equipament.query().with('modelo').fetch();
    return equipaments;
  }

  async indexEquipamentAvaiable({request , response, view}){
    const equipaments = await Equipament.query().with('modelo').where('alocado', false).fetch()
    return equipaments;
  }

  async indexEquipamentInUse({ request, response, view}){
    const equipaments = await Equipament.query().with('modelo').where('alocado', true).fetch();
    return equipaments;
  }

 
  /**
   * Render a form to be used for creating a new equipament.
   * GET equipaments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Create/save a new equipament.
   * POST equipaments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth,  response }) {
    const data = request.body;
    
    const equipament = await Equipament.create({ 'usuario_criacao': auth.user.username, ...data });
    console.log(equipament);
    return equipament;
  }

  /**
   * Display a single equipament.
   * GET equipaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const equipament = await Equipament.findOrFail(params.id);
    return equipament;
  }

  /**
   * Render a form to update an existing equipament.
   * GET equipaments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 

  /**
   * Update equipament details.
   * PUT or PATCH equipaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.body;
    const equipament = await Equipament.findOrFail(params.id);

    equipament.merge(data);
    await equipament.save();
    return equipament;
  }

  /**
   * Delete a equipament with id.
   * DELETE equipaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const equipament = await Equipament.findOrFail(params.id);
    await equipament.delete();
  }
}

module.exports = EquipamentController
