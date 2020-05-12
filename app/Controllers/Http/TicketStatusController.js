'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const TicketStatus = use('App/Models/TicketStatus');
class TicketStatusController {
  /**
   * Show a list of all ticketstatuses.
   * GET ticketstatuses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const status = TicketStatus.all();
    return status;
  }

  /**
   * Render a form to be used for creating a new ticketstatus.
   * GET ticketstatuses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Create/save a new ticketstatus.
   * POST ticketstatuses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const data = request.body;
    const status = await TicketStatus.create({ 'usuario_criacao': auth.user.username, ...data });
    return status;
  }

  /**
   * Display a single ticketstatus.
   * GET ticketstatuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const status = await TicketStatus.findOrFail(params.id);
    return status;
  }

  /**
   * Render a form to update an existing ticketstatus.
   * GET ticketstatuses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Update ticketstatus details.
   * PUT or PATCH ticketstatuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.body;
    const status = await TicketStatus.findOrFail(params.id);

    status.merge(data);
    await status.save();
    return status;
  }

  /**
   * Delete a ticketstatus with id.
   * DELETE ticketstatuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const status = await TicketStatus.findOrFail(params.id);
    status.delete();
  }
}

module.exports = TicketStatusController
