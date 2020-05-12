'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Chip = use('App/Models/Chip');

class ChipController {
  /**
   * Show a list of all chips.
   * GET chips
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const chips = await Chip.query().with('situation').fetch();

    return chips;
  }


  async indexByDisponivel() {
    const chip = await Chip.query().with('situation').where('em_uso', '=', false).fetch();
    return chip;
  }

  /**
   * Render a form to be used for creating a new chip.
   * GET chips/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Create/save a new chip.
   * POST chips
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const data = request.body;
    const chip = await Chip.create({ 'usuario_criacao': auth.user.username, ...data })
    return chip;
  }

  /**
   * Display a single chip.
   * GET chips/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const chip = await Chip.findOrFail(params.id);
    await chip.load('situation')
    return chip;

  }

  /**
   * Render a form to update an existing chip.
   * GET chips/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Update chip details.
   * PUT or PATCH chips/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.body;
    const chip = await Chip.findOrFail(params.id);
    chip.merge(data);
    await chip.save();
    return chip;
  }

  /**
   * Delete a chip with id.
   * DELETE chips/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const chip = await Chip.findOrFail(params.id);
    chip.delete();
  }
}

module.exports = ChipController
