'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Cargo = use('App/Models/Cargo');
class CargoController {
  /**
   * Show a list of all cargos.
   * GET cargos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const cargo = await Cargo.all();
    return cargo;
  }

  /**
   * Render a form to be used for creating a new cargo.
   * GET cargos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Create/save a new cargo.
   * POST cargos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth ,response }) {
    const data = request.body
    const cargo = await Cargo.create({ 'usuario_criacao' : auth.user.username , ...data });
    return cargo;
  }

  /**
   * Display a single cargo.
   * GET cargos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const cargo = await Cargo.findOrFail(params.id);
    return cargo;
  }

  /**
   * Render a form to update an existing cargo.
   * GET cargos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Update cargo details.
   * PUT or PATCH cargos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.body;
    const cargo = await Cargo.findOrFail(params.id);

    cargo.merge(data);
    await cargo.save();
    return cargo;

  }

  /**
   * Delete a cargo with id.
   * DELETE cargos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const cargo = await Cargo.findOrFail(params.id);
    await cargo.delete();
  }
}

module.exports = CargoController
