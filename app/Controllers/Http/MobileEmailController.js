'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const MobileEmail = use('App/Models/MobileEmail');
class MobileEmailController {
  /**
   * Show a list of all mobileemails.
   * GET mobileemails
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const mobile_emails = await MobileEmail.all();
    return mobile_emails;
  }

  /**
   * Render a form to be used for creating a new mobileemail.
   * GET mobileemails/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async indexByEmailDisponivel(){
    const mobile_email = await MobileEmail.query().where('disponivel', '=' , true ).fetch();
    return mobile_email
  }

  /**
   * Create/save a new mobileemail.
   * POST mobileemails
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth ,response }) {
    const data = request.body;
    const mobileEmail = await MobileEmail.create({ 'usuario_criacao': auth.user.username, ...data });
    return mobileEmail;
  }

  /**
   * Display a single mobileemail.
   * GET mobileemails/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const mobile_email = await MobileEmail.findOrFail(params.id);
    return mobile_email;
  }

  /**
   * Render a form to update an existing mobileemail.
   * GET mobileemails/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Update mobileemail details.
   * PUT or PATCH mobileemails/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const mobileEmail = await MobileEmail.findOrFail(params.id);
    const data = request.body;

    mobileEmail.merge(data);
    await mobileEmail.save();
    return mobileEmail;

  }

  /**
   * Delete a mobileemail with id.
   * DELETE mobileemails/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const mobileEmail = await MobileEmail.findOrFail(params.id);
    await mobileEmail.delete();
  }
}

module.exports = MobileEmailController
