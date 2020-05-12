'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Collaborator = use('App/Models/Collaborator')
const Email = use('App/Models/Email')
class CollaboratorController {
  /**
   * Show a list of all collaborators.
   * GET collaborators
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const collaborators = await Collaborator.query().with('cargo').with('setor').with('email').with('empresa').fetch();

    return collaborators;
  }

  async indexByCity({ request, response, view, params}){
    const colaboradores = await Collaborator.query().with('cargo').with('setor').with('email').with('empresa').where('empresa_id', '=', params.id ).fetch();
    return colaboradores;
  }

  /**
   * Render a form to be used for creating a new collaborator.
   * GET collaborators/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Create/save a new collaborator.
   * POST collaborators
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request , auth, response }) {
    const data = request.body;
    
    const collaborator = await Collaborator.create({ 'usuario_criacao' : auth.user.username , ...data });

    const userEmail =  await Email.findOrFail(data.email_id);
    userEmail.em_uso = true;
    await userEmail.save();

    
    return collaborator;
  }

  /**
   * Display a single collaborator.
   * GET collaborators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const collaborator = await Collaborator.findOrFail(params.id);
    return collaborator;
  }

  /**
   * Render a form to update an existing collaborator.
   * GET collaborators/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Update collaborator details.
   * PUT or PATCH collaborators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.body;
    const collaborator = await Collaborator.findOrFail(params.id);

    collaborator.merge(data);
    await collaborator.save();
    return collaborator;
  }

  /**
   * Delete a collaborator with id.
   * DELETE collaborators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const collaborator = await Collaborator.findOrFail(params.id);
    await collaborator.delete();
  }
}

module.exports = CollaboratorController
