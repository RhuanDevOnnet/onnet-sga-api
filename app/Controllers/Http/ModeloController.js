'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Modelo = use('App/Models/Modelo');
class ModeloController {
  /**
   * Show a list of all modelos.
   * GET modelos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const modelo = await Modelo.query().with('marca').fetch();
    return modelo;
  }

    /**
   * Show a list of all modelos.
   * GET modelos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async indexByMarca ({ request, response, view, params }) {
    const modelo = await Modelo.query().where('marca_id', '=' , params.id ).fetch();
    return modelo;
  }

  async indexOnlyEquipament({ request, response, view, params}){
    const modelo = await Modelo.query().where('exclusivo_mobile', false).fetch();
    return modelo;
  }

  /**
   * Create/save a new modelo.
   * POST modelos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth,  response }) {
    const data = request.body;
    const modelo = await Modelo.create({ usuario_criacao : auth.user.username , ...data});
    return modelo;
    
  }

  /**
   * Display a single modelo.
   * GET modelos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const modelo = await Modelo.findOrFail(params.id);
    return modelo;
  }

  /**
   * Update modelo details.
   * PUT or PATCH modelos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.body;
    const modelo = await Modelo.findOrFail(params.id);

    modelo.merge(data);
    await modelo.save();
    return modelo;
  }

  /**
   * Delete a modelo with id.
   * DELETE modelos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const modelo = await Modelo.findOrFail(params.id);
    return modelo.delete();
  }
}

module.exports = ModeloController
