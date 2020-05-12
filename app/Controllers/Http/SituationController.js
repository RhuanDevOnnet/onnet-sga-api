'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Situation = use('App/Models/Situation');


class SituationController {
  /**
   * Show a list of all situations.
   * GET situations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const situations = await Situation.all();
    return situations;
  }

  /**
   * Render a form to be used for creating a new situation.
   * GET situations/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 
  /**
   * Create/save a new situation.
   * POST situations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth,  response }) {
    const data = request.body
    const situation = await Situation.create({  usuario_criacao: auth.user.username,  ...data });
    return situation;
  }

  /**
   * Display a single situation.
   * GET situations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const situation = await Situation.findOrFail(params.id);
    return situation;
  }

  /**
   * Render a form to update an existing situation.
   * GET situations/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 

  /**
   * Update situation details.
   * PUT or PATCH situations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const situation = await Situation.findOrFail(params.id);
    const data = request.body;

    situation.merge(data);
    await situation.save();
    return situation;
    
  }

  /**
   * Delete a situation with id.
   * DELETE situations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const situation = await Situation.findOrFail(params.id);
    await situation.delete();
  }
}

module.exports = SituationController
