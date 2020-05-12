'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Email = use('App/Models/Email')
class EmailController {
  /**
   * Show a list of all emails.
   * GET emails
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const emails = await Email.all();
    return emails;
  }

  async indexByEmailDisponivel(){
    const emails = await Email.query().where('em_uso', '=', false ).fetch();
    return emails;
  }

  /**
   * Render a form to be used for creating a new email.
   * GET emails/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Create/save a new email.
   * POST emails
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth,  response }) {
    const data = request.body;  
    const email = await Email.create({
      'usuario_criacao': auth.user.username,
      'em_uso': false,
      ...data
     });

     return email;
  }

  /**
   * Display a single email.
   * GET emails/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const email = await Email.findOrFail(params.id);
    return email;
  }

  /**
   * Render a form to update an existing email.
   * GET emails/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Update email details.
   * PUT or PATCH emails/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const email = await Email.findOrFail(params.id);
    const data = request.body;

    email.merge(data);
    await email.save();
    return email;
  }

  /**
   * Delete a email with id.
   * DELETE emails/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const email = await Email.findOrFail(params.id);
    email.delete();
  }
}

module.exports = EmailController
