'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Permissao = use('App/Models/Permissao');
class PermissaoController {
  /**
   * Show a list of all permissaos.
   * GET permissaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const permissao = await Permissao.all();
    return permissao;
  }

  /**
   * Render a form to be used for creating a new permissao.
   * GET permissaos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 

  /**
   * Create/save a new permissao.
   * POST permissaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth,  response }) {
    const data = request.body;
    const permissao = await Permissao.create({ 'usuario_criacao' : auth.user.username,  ...data });
    return permissao;
  }

  /**
   * Display a single permissao.
   * GET permissaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const permissao = await Permissao.findOrFail(params.id);
    return permissao;
  }

  /**
   * Render a form to update an existing permissao.
   * GET permissaos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Update permissao details.
   * PUT or PATCH permissaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.body;
    const permissao = await Permissao.findOrFail(params.id);

    permissao.merge(data);
    await permissao.save();
    return permissao;
  }

  /**
   * Delete a permissao with id.
   * DELETE permissaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const permissao = await Permissao.findOrFail(params.id);
    permissao.delete();
  }
}

module.exports = PermissaoController
