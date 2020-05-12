'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Phone = use('App/Models/Phone');

class PhoneController {
  /**
   * Show a list of all phones.
   * GET phones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {

    const phones = await Phone.query().with('modelo').with('situation').fetch();
    return phones;

    }


     /**
   * Show a list of all phones.
   * GET phones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async findAllDisponivel(){
 
    const phones = await Phone.query().with('modelo.marca').with('situation').where('alocado', false ).fetch();
    return phones;
  }
  /**
   * Render a form to be used for creating a new phone.
   * GET phones/create  
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 

  /**
   * Create/save a new phone.
   * POST phones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth,  response }) {
    const data = request.body;
    data.alocado = false;
    data.estragado = false;

    const phone = await Phone.create({ usuario_criacao: auth.user.username, ...data });
    return phone;
  }

  /**
   * Display a single phone.
   * GET phones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const phone = await Phone.findOrFail(params.id);
    return phone;

  }

  /**
   * Render a form to update an existing phone.
   * GET phones/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Update phone details.
   * PUT or PATCH phones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const phone = await Phone.findOrFail(params.id);
    const data = request.body;

    phone.merge(data);
    await phone.save();
    return phone;
  }

  /**
   * Delete a phone with id.
   * DELETE phones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {

    const phone = await Phone.findOrFail(params.id);
    await phone.destroy();
  }
}

module.exports = PhoneController
