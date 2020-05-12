'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with marcas
 */

const Marca = use('App/Models/Marca');
class MarcaController {
  /**
   * Show a list of all marcas.
   * GET marcas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const marcas = await Marca.all();
    return marcas;
  }

  /**
   * Create/save a new marca.
   * POST marcas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const data = request.body;
    const marca = await Marca.create({ usuario_criacao: auth.user.username , ...data });  
    return marca;
  }

  /**
   * Display a single marca.
   * GET marcas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const marca = await Marca.findOrFail(params.id);
    return marca;
  }

  /**
   * Render a form to update an existing marca.
   * GET marcas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Update marca details.
   * PUT or PATCH marcas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.body;
    const marca = await Marca.findOrFail(params.id);

    marca.merge(data);
    await marca.save();
    return marca
  }

  /**
   * Delete a marca with id.
   * DELETE marcas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const marca = await Marca.findOrFail(params.id);
    await marca.delete();
  }
}

module.exports = MarcaController
